import express from 'express';
import { generateKeys, getAccountInfo, getAllTransactions } from '../controllers/blockchain.js';

const router = express.Router();

router.get('/', generateKeys)
router.get('/account', getAccountInfo)
router.get('/transactions', getAllTransactions)

export default router;