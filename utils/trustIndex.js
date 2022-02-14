import { arrayUnion, doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export const calculateTrustIndex = async (pid) => {
    const postRef = doc(db, "posts", pid);
    const postSnap = await getDoc(postRef);
    const {
        user_vote_fake: userVoteFake,
        user_vote_real: userVoteReal,
        investigator_info: investigatorInfo,
        jury_info: juryInfo,
        author_id: aid,
    } = postSnap.data();

    const normalUserScore =
        userVoteReal.length / (userVoteFake.length + userVoteReal.length);

    let totalInvRating = 0;
    let combinedInvRatingAndVote = 0;
    investigatorInfo.forEach((inv) => {
        totalInvRating += inv.userRating;
        combinedInvRatingAndVote += (inv.vote ? 1 : -1) * inv.userRating;
    });
    const investigatorScore =
        ((combinedInvRatingAndVote / totalInvRating + 1) / 2) * 15;

    let totalJuryRating = 0;
    let combinedJuryRatingAndGrade = 0;
    juryInfo.forEach((juror) => {
        totalJuryRating += juror.userRating;
        combinedJuryRatingAndGrade += inv.grade * inv.userRating;
    });
    const juryScore =
        ((combinedJuryRatingAndGrade / totalJuryRating + 100) / 200) * 35;

    const authorRef = doc(db, "authors", aid);
    const authSnap = await getDoc(authorRef);
    const authorRating = authSnap.data().author_rating;
    const authorMultiplier =
        authorRating > 80 ? 1.1 : authorRating < 30 ? 0.9 : 1.0;

    const combinedScore =
        (normalUserScore + investigatorScore + juryScore) * authorMultiplier;

    await updateDoc(postRef, {
        normal_user_score: normalUserScore,
        investigator_score: investigatorScore,
        jury_score: juryScore,
        author_rating: authorRating,
        author_multiplier: authorMultiplier,
        combined_score: combinedScore,
    });

    const authorIncrement =
        combinedScore > 90
            ? 5
            : combinedScore > 80
            ? 4
            : combinedScore > 70
            ? 3
            : combinedScore > 60
            ? 2
            : combinedScore > 50
            ? 1
            : combinedScore > 40
            ? -1
            : combinedScore > 30
            ? -2
            : combinedScore > 20
            ? -3
            : combinedScore > 10
            ? -4
            : -5
    await updateDoc(authorRef, {
        trust_index_scores: arrayUnion(combinedScore),
        author_rating: increment(authorIncrement)
    });
};