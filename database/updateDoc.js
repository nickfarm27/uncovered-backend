import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";

const testRef = doc(db, "Users", "9RVPolmrAAYaemxuhoxQSE7sZxY2");
const addRef = doc(db, "posts", "1460661598536744965")

// Set the "capital" field of the city 'DC'
await updateDoc(testRef, {
  zzzef: "SOMETHIGN HERE"
});

// try {
//     const docSnap = await getDoc(testRef);

//     if (docSnap.exists()) {
//         const newRef = docSnap.data().ref
//         // console.log({data: docSnap.data().ref})
//         const newDocSnap = await getDoc(newRef)
//         console.log(newDocSnap.data())

//     } else {
//         console.log({message: "No document found"})
//     }
// } catch (error) {
//     console.log({error: error})
// }