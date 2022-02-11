import { doc, getDoc, setDoc } from "firebase/firestore";
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

export const createNewUser = async (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const uid = req.body.uid

    console.log(email, username, uid);

    const userRef = doc(db, "users", String(uid))
    const { privateKey, publicKey, address } = generateKeys()

    const data = {
        uid: uid,
        username: username,
        email: email,
        role: "NORMAL",
        userRating: 0,
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
        console.log("NOT WORKING??");
        res.json({user: data})
    } catch (error) {
        res.json({error: error})
    }
}