import express from 'express';

import { createNewUser, getUserInfo } from '../controllers/users.js';

const router = express.Router();

router.post('/new', createNewUser)
router.get('/:uid', getUserInfo);

export default router;