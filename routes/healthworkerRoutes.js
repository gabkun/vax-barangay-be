import express from 'express';
import { getHealthworkers, getPendingHealthworker, approveHealthworker, declineHealthworker, getHealthworkerById, updateHealthworker, deleteHealthworker, countHealthworkers } from '../controllers/healthworkerController.js';

const router = express.Router();

router.get('/approved', getHealthworkers);
router.get('/pending', getPendingHealthworker);
router.get('/:id', getHealthworkerById);
router.put('/approve/:id', approveHealthworker);
router.put('/decline/:id', declineHealthworker);
router.put('/:id', updateHealthworker);
router.delete('/:id', deleteHealthworker);
router.get('/total/healthworker', countHealthworkers);

export default router;
