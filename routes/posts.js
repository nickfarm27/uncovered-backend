import express from 'express';

import { addInvestigatorResearch, addJuryReview, addUserVote, createPost, getSinglePost, getUnverifiedPosts, getVerifiedPosts } from '../controllers/posts.js';

const router = express.Router();

router.post('/', createPost);
router.get('/verified', getVerifiedPosts);
router.get('/unverified', getUnverifiedPosts);
router.post('/investigator', addInvestigatorResearch);
router.post('/jury', addJuryReview);
router.post('/vote', addUserVote);
router.get('/:id', getSinglePost)

export default router;