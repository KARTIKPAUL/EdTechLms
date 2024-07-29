import express from 'express'
import { Router } from 'express'
import { register , login , getuser , logout , forgotPassword , resetPassword } from '../Controllers/userController.js'
import { isLoggedin } from '../Middlewares/authMiddleware.js'
import upload from '../Middlewares/multerMiddleware.js';
const router = Router();

router.post('/register' , upload.single("avater"), register)
router.post('/login' , login)
router.get('/getuser' , isLoggedin , getuser)
router.get('/logout' , logout)
router.post('/forgotpassword',forgotPassword)
router.post('/resetpassword',resetPassword)

export default router 