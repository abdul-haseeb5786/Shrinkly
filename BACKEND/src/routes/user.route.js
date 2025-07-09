import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getAllUserClicks, getAllUserUrls } from '../controller/user.controller.js';


const router = express.Router();

router.get('/urls', authMiddleware, getAllUserUrls);  
router.get('/clicks', authMiddleware, getAllUserClicks);  


export default router;