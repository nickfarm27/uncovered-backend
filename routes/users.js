import express from 'express';

import { createNewUser, getAuthorInfo, getUserInfo, rateUser, upgradeToInvestigator, upgradeToJury } from '../controllers/users.js';

const router = express.Router();

router.post('/new', createNewUser)
router.post('/upgrade/investigator', upgradeToInvestigator)
router.post('/upgrade/jury', upgradeToJury)
router.post('/rate', rateUser)
router.get('/:uid', getUserInfo);
router.get('/author/:aid', getAuthorInfo)

export default router;