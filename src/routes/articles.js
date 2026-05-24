import express from 'express'
import {getArticles} from '../controllers/ArticlesController.js';

const router = express.Router();
router.get('/', getArticles)

export default router;