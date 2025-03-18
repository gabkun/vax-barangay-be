import express from 'express';
import { getHealthworkers, getPendingHealthworker, approveHealthworker, declineHealthworker } from '../controllers/healthworkerController.js';

const router = express.Router();

router.get('/approved', getHealthworkers);
router.get('/pending', getPendingHealthworker);
router.put('/approve/:id', approveHealthworker);
router.put('/decline/:id', declineHealthworker);

export default router;
