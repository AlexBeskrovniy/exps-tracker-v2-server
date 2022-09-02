import express from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoriesController.mjs';

const router = express.Router();

router
    .get('/api/categories', getCategories)
    .post('/api/categories/create', createCategory)
    .put('/api/categories/edit', updateCategory)
    .delete('/api/categories/delete', deleteCategory);

export default router;