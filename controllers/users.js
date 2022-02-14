import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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