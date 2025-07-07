import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getAllUserUrls } from '../controller/user.controller.js';


const router = express.Router();

router.get('/urls', authMiddleware, getAllUserUrls);  


export default router;