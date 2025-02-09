import express from 'express';
import { getalltask, userTask } from '../controller/datacontroller.js';

const router = express.Router();

router.post('/userTask',userTask)

router.get('/getalltask', getalltask);

export default router;