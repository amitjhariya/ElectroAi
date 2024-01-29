// routes/visitorRoutes.js
import express from 'express';
import {createAi,loadModel} from '../controllers/aiController.js';

const router = express.Router();

// Create a new visitor
router.post('/', createAi);
router.post('/loadmodel', loadModel);


// Get all visitors
// router.get('/', visitorController.getAllVisitors);

export default router;
