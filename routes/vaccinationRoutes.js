import express from 'express';
import { createVaccination, getVaccination, getVaccinationById, setCompleted, setCancelled  } from '../controllers/vaccinationController.js'

const router = express.Router();

router.post('/create', createVaccination);
router.get('/', getVaccination);
router.get('/:id', getVaccinationById);
router.put('/completed/:id', setCompleted);
router.put('/cancelled/:id', setCancelled);

export default router;