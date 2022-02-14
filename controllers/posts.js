import axios from "axios";
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    increment,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../firebase.js";

export const getVerifiedPosts = async (req, res) => {
    try {
        // Create a reference to the cities collection
        const postsRef = collection(db, "posts");

        // Create a query against the collection.
        const q = query(postsRef, where("verified", "==", true));
        const querySnapshot = await getDocs(q);

        let postsList = [];
        querySnapshot.forEach((post) => {
            postsList.push(post.data());
        });
        res.json({ data: postsList });
    } catch (error) {
        res.json({ error: error });
    }
};

export const getUnverifiedPosts = async (req, res) => {
    try {
        // Create a reference to the cities collection
        const postsRef = collection(db, "posts");

        // Create a query against the collection.
        const q = query(postsRef, where("verified", "==", false));
        const querySnapshot = await getDocs(q);

        let postsList = [];
        querySnapshot.forEach((post) => {
            postsList.push(post.data());
        });
        res.json({ data: postsList });
    } catch (error) {
        res.json({ error: error });
    }
};

export const getSinglePost = async (req, res) => {
    const id = req.params.id;

    try {
        const postRef = doc(db, "posts", id);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
            res.json({data: docSnap.data()})
        } else {
            res.json({message: "No document found"})
        }
    } catch (error) {
        res.json({error: error})
    }
}

export const createPost = async (req, res) => {
    const uid = req.body.uid
    const url = req.body.url;
    const tweetId = url.split("/").pop().split("?")[0];

    const config = {
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
    };

    //? Check for post in DB
    try {
        const postRef = doc(db, "posts", tweetId);
        const docSnap = await getDoc(postRef);
        const userRef = doc(db, "users", uid)

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            await updateDoc(postRef, {
                user_uploads: arrayUnion(uid)
            })
            res.json({ data: docSnap.data() });
        } else {
            //* doc.data() will be undefined in this case
            //? get post from twitter
            try {
                const response = await axios.get(
                    `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&tweet.fields=created_at&user.fields=profile_image_url`,
                    config
                );
                const tweetData = response.data;

                if (tweetData.data) {
                    const { id, text, created_at, author_id } = tweetData.data;
                    const { name, username, profile_image_url } = tweetData.includes.users[0];
                    const data = {
                        tweet_id: id,
                        text: text,
                        created_at: created_at,
                        author_id: author_id,
                        author_name: name,
                        author_username: username,
                        verified: false,
                        author_profile_image_url: profile_image_url,
                        user_vote_real: [],
                        user_vote_fake: [],
                        investigator_ids: [],
                        investigator_info: [],
                        jury_ids: [],
                        jury_info: [],
                        user_uploads: [uid],
                    };

                    // TODO: add author data - if present, just add post, if not, add new author data

                    try {
                        await setDoc(postRef, data);
                        res.json({ data: data });
                    } catch (error) {
                        res.json({ type: "Failed to add", error: error });
                    }
                } else {
                    res.json({ type: "No post found error", error: error });
                }
            } catch (error) {
                res.json({ type: "Twitter Error", error: error });
            }
        }
    } catch (error) {
        res.json({ type: "Firebase Error", error: error });
    }
};

export const addInvestigatorResearch = async (req, res) => {
    const { pid, uid, username, userRating, researchText, vote } = req.body
    const postRef = doc(db, "posts", pid)
    const userRef = doc(db, "users", uid)

    try {
        await updateDoc(postRef, {
            investigator_ids: arrayUnion(uid),
            investigator_info: arrayUnion({
                uid: uid,
                username: username,
                userRating: Number(userRating),
                researchText: researchText,
                vote: vote
            })
        })
        await updateDoc(userRef, {
            numberOfVerifiedNews: increment(1)
        })
        res.json({message: "ADDED INVESTIGATOR RESEARCH TO DATABASE"})
    } catch (error) {
        res.json({error: error})
    }
}

export const addJuryReview = async (req, res) => {
    const { pid, uid, username, userRating, researchText, grade, juryCount } = req.body
    const newGrade = Number(grade) * 2 - 100

    const postRef = doc(db, "posts", pid)
    const userRef = doc(db, "users", uid)

    try {
        await updateDoc(postRef, {
            jury_ids: arrayUnion(uid),
            jury_info: arrayUnion({
                uid: uid,
                username: username,
                userRating: Number(userRating),
                researchText: researchText,
                grade: newGrade,
                ratingDone: false,
            }),
            verified: (Number(juryCount) === 4)
        })
        await updateDoc(userRef, {
            numberOfVerifiedNews: increment(1)
        })
        if (Number(juryCount) === 4) {
            // TODO: calculate trust index


            // TODO: update author's info
        }
        res.json({message: "ADDED JURY REVIEW TO DATABASE"})
    } catch (error) {
        res.json({error: error})
    }
}

export const addUserVote = async (req, res) => {
    const { pid, uid, vote } = req.body
    console.log(vote);

    const postRef = doc(db, "posts", pid)
    try {
        if (vote) {
            await updateDoc(postRef, {
                user_vote_real: arrayUnion(uid)
            })
        } else {
            await updateDoc(postRef, {
                user_vote_fake: arrayUnion(uid)
            })
        }
        res.json({message: `VOTED ${vote} for the post`})
    } catch (error) {
        res.json({error: error})
    }
}