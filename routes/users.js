import express from 'express';

import { createPrivateKey } from '../controllers/users.js';

const router = express.Router();

router.get('/', createPrivateKey);

export default router;