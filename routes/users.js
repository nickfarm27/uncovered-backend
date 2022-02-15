import express from 'express';

import { createNewUser, getAuthorInfo, getLeaderboardData, getUserInfo, rateUser, upgradeToInvestigator, upgradeToJury } from '../controllers/users.js';

const router = express.Router();

router.post('/new', createNewUser)
router.post('/upgrade/investigator', upgradeToInvestigator)
router.post('/upgrade/jury', upgradeToJury)
router.post('/rate', rateUser)
router.get('/author/:aid', getAuthorInfo)
router.get('/leaderboard', getLeaderboardData)
router.get('/:uid', getUserInfo);

export default router;