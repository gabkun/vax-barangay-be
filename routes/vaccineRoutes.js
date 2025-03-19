import express from 'express';
import { createVaccine, getVaccines, getVaccineById, updateVaccine, deleteVaccine } from '../controllers/vaccineController.js'

const router = express.Router();

router.post('/create', createVaccine);
router.get('/', getVaccines);
router.get('/:id', getVaccineById);
router.put('/vaccines/:id', updateVaccine);
router.delete('/vaccines/:id', deleteVaccine);

export default router;