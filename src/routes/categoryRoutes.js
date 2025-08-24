import express from 'express';
const router = express.Router();

import CategoryController from '../controllers/categoryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get("/", CategoryController.getAllCategories); 
router.get("/:id", authMiddleware, CategoryController.getCategoryById);
router.post("/", CategoryController.createCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.removeCategory);

export default router;
