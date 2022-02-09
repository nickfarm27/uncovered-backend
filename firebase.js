// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBpF5RQn_G3xXxaCm87jbdvK82zHnlkBI",
  authDomain: "uncovered-fa94a.firebaseapp.com",
  projectId: "uncovered-fa94a",
  storageBucket: "uncovered-fa94a.appspot.com",
  messagingSenderId: "551601620495",
  appId: "1:551601620495:web:d25f97a9f75cf923bc057a",
  measurementId: "G-2GRCMFXME8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const get_Firestore = getFirestore(app);

export { get_Firestore };