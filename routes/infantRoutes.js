import express from 'express';
import { createInfant, getInfants, getInfantById, updateInfant, deleteInfant, countInfants } from '../controllers/infantController.js'; 

const router = express.Router();

router.post('/create', createInfant);
router.get('/', getInfants);
router.get('/:id', getInfantById);
router.put('/infants/:id', updateInfant);
router.delete('/infants/:id', deleteInfant);
router.get('/totalinfant/total', countInfants);

export default router;