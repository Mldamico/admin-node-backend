import { Router } from 'express'
import { addOrExtractOperation, getAllOperationsByIncome, getAllOperationsByOutcome, updateOperation, deleteOperation, getAllOperations, getLast10Operations } from '../controllers/operationController.js';
import verifyJWT from '../middleware/verifyJWT.js';


const router = Router();

router.use(verifyJWT)


router.route('/').get(getAllOperations).post(addOrExtractOperation).patch(updateOperation).delete(deleteOperation)

router.get('/last', getLast10Operations)

router.get("/income", getAllOperationsByIncome)

router.get("/outcome", getAllOperationsByOutcome)
export default router;