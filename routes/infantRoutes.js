import express from 'express';
import { createInfant, getInfants} from '../controllers/infantController.js'; 

const router = express.Router();

router.post('/create', createInfant);
router.get('/', getInfants);


export default router;