import axios from "axios";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
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
    const url = req.body.url;
    const tweetId = url.split("/").pop();

    const config = {
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
    };

    //? Check for post in DB
    try {
        const postRef = doc(db, "posts", tweetId);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
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
                        author_profile_image_url: profile_image_url
                    };
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
