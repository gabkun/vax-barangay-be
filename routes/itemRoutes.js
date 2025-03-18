import express from 'express';
import { createPurok, getPurok, getInactivepurok } from '../controllers/purokController.js'

const router = express.Router();

router.post('/create', createPurok);
router.get('/', getPurok);
router.get('/inactive', getInactivepurok);

export default router;