import express from 'express';
import { createVaccination, getVaccination, getVaccinationById, setCompleted, setCancelled, updateVaccination, deleteVaccination, countVaccination, getVaccinationToday  } from '../controllers/vaccinationController.js'

const router = express.Router();

router.post('/create', createVaccination);
router.get('/', getVaccination);
router.get('/today', getVaccinationToday);
router.get('/:id', getVaccinationById);
router.get('/total/vaccinated', countVaccination);
router.put('/completed/:id', setCompleted);
router.put('/cancelled/:id', setCancelled);
router.put('/:id', updateVaccination);
router.delete('/:id', deleteVaccination);

export default router;