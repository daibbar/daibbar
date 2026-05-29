import express from 'express';
import { getProjects } from '../controllers/ProjectsController.js';

const router = express.Router();
router.get('/', getProjects);

export default router;