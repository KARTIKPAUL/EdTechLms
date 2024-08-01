import {Router } from 'express'
import { register , login , logout ,getProfile ,forgotPassword , resetPassword, changePassword, updateUser } from '../Controllers/userController.js';
import isLoggedin from '../Controllers/authMiddleware.js';
import upload from '../Middlewares/multerMiddleware.js';

const router = Router();

router.post('/register',upload.single("avater"),register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedin,getProfile);
router.post('/reset',forgotPassword);
router.post('/reset/:resetToken',resetPassword);
router.post('/change-password',isLoggedin,changePassword);
router.put('/update',upload.single("avater"),updateUser)

export default router;