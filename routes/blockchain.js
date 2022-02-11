import express from 'express';
import { generateKeys, getAccountInfo, getAllTransactions, getBlockTransactionInfo, transferCoins, uploadDataToBlockchain } from '../controllers/blockchain.js';

const router = express.Router();

router.get('/', generateKeys)
router.get('/account/:address', getAccountInfo)
router.get('/transactions/:publicKey', getAllTransactions)
router.post('/transfer', transferCoins)
router.post('/upload', uploadDataToBlockchain)
router.get('/block/:height', getBlockTransactionInfo)

export default router;