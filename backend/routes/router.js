import express from 'express';
import { deletetask, getalltask, userTask } from '../controller/datacontroller.js';

const router = express.Router();

router.post('/userTask',userTask)

router.get('/getalltask', getalltask);

router.delete("/deletetask",deletetask)



export default router;