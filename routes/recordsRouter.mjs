import express from 'express';
import { auth } from '../middleware/auth.mjs';
import { createRecord, deleteRecord, getRecords, updateRecord } from '../controllers/recordsController.mjs';

const router = express.Router();

router
    .get('/api/records', auth, getRecords)
    .post('/api/records/create', auth, createRecord)
    .put('/api/records/edit', auth, updateRecord)
    .delete('/api/records/delete', auth, deleteRecord);

export default router;