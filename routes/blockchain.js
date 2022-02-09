import express from 'express';
import { generateKeys, getAccountInfo } from '../controllers/blockchain.js';

const router = express.Router();

router.get('/', generateKeys)
router.get('/account', getAccountInfo)

export default router;