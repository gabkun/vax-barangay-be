import express from 'express';
import { signupAdmin, signupHealthworker, login, verifyCode, getUserDetails, authenticateToken, getAdminDetails } from '../controllers/auth.js'; 

const router = express.Router();

router.post('/signup', signupHealthworker);
router.post('/verify-code', verifyCode);
router.post('/signupadmin', signupAdmin);
router.get('/user-details', authenticateToken, getUserDetails);
router.get('/admin-details', authenticateToken, getAdminDetails);
router.post('/login', login);

export default router;