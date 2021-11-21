import express from "express";
import cors from "cors";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

app.get("/", (req, res) => {
    res.send("HI");
});

// Initialize Cloud Firestore through Firebase
const firebaseApp = initializeApp({
    apiKey: "AIzaSyCBpF5RQn_G3xXxaCm87jbdvK82zHnlkBI",
    authDomain: "uncovered-fa94a.firebaseapp.com",
    projectId: "uncovered-fa94a",
});

const db = getFirestore();

// const querySnapshot = await getDocs(collection(db, "Users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

app.post("/twitter", (req, res) => {
    const url = req.body.url;
    const tweetId = url.split("/").pop();
    console.log(tweetId);

    const config = {
        headers: {
            Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAACHxVwEAAAAAfkN1tlucuoTmdMoulsJFxXYqsdg%3DUQgc60spBW9F0Rnydd0FKF1GPGFUM4Fm1i1oWbT9id6IsAWczU`,
        },
    };

    axios
        .get(
            `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&tweet.fields=created_at&user.fields=created_at`,
            config
        )
        .then(function (response) {
            // handle success
            console.log(response.data);
            const tweetData = response.data;
            res.send(tweetData);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
});

app.listen(3001, () => {
    console.log("starting server on 3001");
});
