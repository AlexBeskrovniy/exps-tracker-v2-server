import express from 'express';
import { createRecord, deleteRecord, getRecords, updateRecord } from '../controllers/recordsController.mjs';

const router = express.Router();

router
    .get('/api/records', getRecords)
    .post('/api/records/create', createRecord)
    .put('/api/records/edit', updateRecord)
    .delete('/api/records/delete', deleteRecord);

export default router;