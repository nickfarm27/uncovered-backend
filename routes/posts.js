import express from 'express';

import { createPost, getSinglePost, getUnverifiedPosts, getVerifiedPosts } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getSinglePost)
router.post('/', createPost);

router.get('/verified', getVerifiedPosts);
router.get('/unverified', getUnverifiedPosts);

export default router;