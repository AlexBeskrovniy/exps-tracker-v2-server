import express from 'express';
import { auth } from '../middleware/auth.mjs';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoriesController.mjs';

const router = express.Router();

router
    .get('/api/categories', auth, getCategories)
    .post('/api/categories/create', auth, createCategory)
    .put('/api/categories/edit', auth, updateCategory)
    .delete('/api/categories/delete', auth, deleteCategory);

export default router;