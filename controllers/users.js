import { arrayUnion, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { generateKeys } from "../utils/blockchain.js";

export const getUserInfo = async (req, res) => {
    const uid = req.params.uid

    try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            res.json({user: docSnap.data()})
        } else {
            res.json({message: "No document found"})
        }
    } catch (error) {
        res.json({error: error})
    }
}

export const getAuthorInfo = async (req, res) => {
    const aid = req.params.aid

    try {
        const authorRef = doc(db, "authors", aid);
        const docSnap = await getDoc(authorRef);

        if (docSnap.exists()) {
            res.json({author: docSnap.data()})
        } else {
            res.json({message: "No author found"})
        }
    } catch (error) {
        res.json({error: error})
    }
}

export const createNewUser = async (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const uid = req.body.uid

    const userRef = doc(db, "users", uid)
    const { privateKey, publicKey, address } = generateKeys()

    const data = {
        uid: uid,
        username: username,
        email: email,
        role: "NORMAL",
        userRatings: [5],
        experiencePoints: 0,
        numberOfVerifiedNews: 0,
        savedPosts: [],
        privateKey: privateKey,
        publicKey: publicKey,
        address: address,
        // onGoingTask: [],
        // missions: [],
    }

    try {
        await setDoc(userRef, data)
        res.json({user: data})
    } catch (error) {
        res.json({error: error})
    }
}

export const upgradeToInvestigator = async (req, res) => {
    const uid = req.body.uid
    const invClass = req.body.class

    const userRef = doc(db, "users", uid)
    try {
        await updateDoc(userRef, {
            class: invClass,
            role: "INVESTIGATOR"
        })
        res.json({message: "UPDATE SUCCESS"})
    } catch (error) {
        res.json({error: error})
    }
}

export const upgradeToJury = async (req, res) => {
    const uid = req.body.uid
    const userRef = doc(db, "users", uid)

    try {
        await updateDoc(userRef, {
            role: "JURY"
        })
        res.json({message: "UPDATE SUCCESS"})
    } catch (error) {
        res.json({error: error})
    }
}

export const rateUser = async (req, res) => {
    const investigatorId = req.body.uid
    const rating = Number(req.body.rating)
    const userRef = doc(db, "users", investigatorId)

    try {
        await updateDoc(userRef, {
            userRatings: arrayUnion(rating)
        })
        res.json({message: "UPDATE SUCCESS"})
    } catch (error) {
        res.json({error: error})
    }
}

export const updateJuryRatingDone = async (req, res) => {
    const { pid, uid } = req.body
    const postRef = (db, "posts", pid)

    try {
        const postSnap = await getDoc(postRef);
        const { jury_info: juryInfoList } = postSnap.data()

        const juryIndex = juryInfoList.findIndex((juryInfo => juryInfo.uid === uid));
        juryInfoList[juryIndex].ratingDone = true;

        console.log("Updating Jury Rating Check");
        await updateDoc(postRef, {
            jury_info: juryInfoList
        })
    } catch (error) {
        res.json({ error: error, message: "UPDATE JURY RATING ERROR" })
    }
}

export const getLeaderboardData = async (req, res) => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("numberOfVerifiedNews", "desc"));
        const querySnapshot = await getDocs(q);

        let usersList = [];
        querySnapshot.forEach((user) => {
            usersList.push(user.data());
        });
        res.json({ data: usersList });
    } catch (error) {
        res.json({ error: error });
    }
};