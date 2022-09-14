import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.mjs';
import categoriesRouter from './routes/categoriesRouter.mjs';
import recordsRouter from './routes/recordsRouter.mjs';
import { getTotalSpent, getSpentInfo } from './utils/spent-handler.mjs';

const app = express();

//This is for local development only!!!!!!
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
    next();
  }
app.use(allowCrossDomain);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(categoriesRouter);
app.use(recordsRouter);

app.get('/api/total', async (req, res) => {
    const total = await getTotalSpent();
    res
        .status(200)
        .json(total);
});

app.get('/api/infochart', async (req, res) => {
    const info = await getSpentInfo();
    res
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