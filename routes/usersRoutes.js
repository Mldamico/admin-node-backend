import { Router } from 'express'
import { get10LastUsers, getAllUsers } from '../controllers/userController.js';


const router = Router();


router.get("/", getAllUsers)
router.get('/last10', get10LastUsers)

export default router;