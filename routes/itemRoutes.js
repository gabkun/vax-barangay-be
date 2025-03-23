import express from 'express';
import { createPurok, getPurok, getInactivepurok, updatePurok, deletePurok, countPuroks } from '../controllers/purokController.js'

const router = express.Router();

router.post('/create', createPurok);
router.get('/', getPurok);
router.get('/inactive', getInactivepurok);
router.put('/:id', updatePurok);
router.delete('/:id', deletePurok);
router.get('/total', countPuroks);

export default router;