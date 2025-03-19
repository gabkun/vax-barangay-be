import express from 'express';
import { getHealthworkers, getPendingHealthworker, approveHealthworker, declineHealthworker, getHealthworkerById, updateHealthworker } from '../controllers/healthworkerController.js';

const router = express.Router();

router.get('/approved', getHealthworkers);
router.get('/pending', getPendingHealthworker);
router.get('/:id', getHealthworkerById);
router.put('/approve/:id', approveHealthworker);
router.put('/decline/:id', declineHealthworker);
router.put('/healthworkers/:id', updateHealthworker);

export default router;
