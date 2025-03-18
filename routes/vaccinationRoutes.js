import express from 'express';
import { createVaccination, getVaccination } from '../controllers/vaccinationController.js'

const router = express.Router();

router.post('/create', createVaccination);
router.get('/', getVaccination);

export default router;