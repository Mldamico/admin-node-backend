import { Router } from 'express'
import { createUser, login, logout, refresh } from '../controllers/authController.js';


const router = Router();


router.post('/signup', createUser)

router.post('/login', login)

router.get('/refresh', refresh)

router.post('/logout', logout)

export default router;