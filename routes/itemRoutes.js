import express from 'express';
import { createPurok, getPurok, getInactivepurok, updatePurok, deletePurok } from '../controllers/purokController.js'

const router = express.Router();

router.post('/create', createPurok);
router.get('/', getPurok);
router.get('/inactive', getInactivepurok);
router.put('/:id', updatePurok);
router.delete('/:id', deletePurok);

export default router;