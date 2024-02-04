
import express from 'express';
import {loadModel,loadConfigs,setConfig} from '../controllers/configController.js';

const router = express.Router();

router.get('/', loadConfigs);
router.post('/loadmodel', loadModel);
router.post('/', setConfig);



export default router;
