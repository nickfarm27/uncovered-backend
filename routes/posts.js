import express from 'express';

import { createPost, getSinglePost, getUnverifiedPosts, getVerifiedPosts } from '../controllers/posts.js';

const router = express.Router();

router.post('/', createPost);
router.get('/verified', getVerifiedPosts);
router.get('/unverified', getUnverifiedPosts);
router.get('/:id', getSinglePost)

export default router;