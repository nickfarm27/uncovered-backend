import express from 'express';

import { createNewUser, getUserInfo, rateUser, upgradeToInvestigator, upgradeToJury } from '../controllers/users.js';

const router = express.Router();

router.post('/new', createNewUser)
router.post('/upgrade/investigator', upgradeToInvestigator)
router.post('/upgrade/jury', upgradeToJury)
router.post('/rate', rateUser)
router.get('/:uid', getUserInfo);

export default router;