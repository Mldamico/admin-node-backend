import { Router } from 'express'
import { createCategory, deleteCategory, getAllCategories } from '../controllers/categoryController.js';



const router = Router();


router.route('/').get(getAllCategories).post(createCategory).delete(deleteCategory)

export default router;