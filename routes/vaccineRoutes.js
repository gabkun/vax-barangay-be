import express from 'express';
import { createVaccine, getVaccines } from '../controllers/vaccineController.js'

const router = express.Router();

router.post('/create', createVaccine);
router.get('/', getVaccines);

export default router;