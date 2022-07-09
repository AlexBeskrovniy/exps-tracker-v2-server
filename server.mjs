import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { Category } from './models/category.mjs';
import { Record } from './models/record.mjs';
import { getTotalSpent, getSpentInfo } from './utils/spent-handler.mjs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/categories', async (req, res) => {
    const categories = await Category.find( {} ).sort( {createdAt: -1} );
    res
        .set('Access-Control-Allow-Origin', '*')
        .status(200)
        .json(categories);
})

app.get('/api/records', async (req, res) => {
    const records = await Record.find( {} ).sort( {createdAt: -1} ).populate('category', 'name');
    res
        .set('Access-Control-Allow-Origin', '*')
        .status(200)
        .json(records);
});

app.get('/api/total', async (req, res) => {
    const total = await getTotalSpent();
    res
        .set('Access-Control-Allow-Origin', '*')
        .status(200)
        .json(total);
});

app.get('/api/infochart', async (req, res) => {
    const info = await getSpentInfo();
    res
        .set('Access-Control-Allow-Origin', '*')
        .status(200)
        .json(info);
});

//MongoDB Connection
mongoose
	.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.pqimp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
		useNewUrlParser: true
	}) 
	.then( () => console.log('Mongo has connected.'))
	.catch(err => console.log(err));

app.listen(process.env.PORT, () => {
	console.log(`Server has started on the Port: ${process.env.PORT}`);
});