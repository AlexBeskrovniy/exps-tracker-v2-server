import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.mjs';
import categoriesRouter from './routes/categoriesRouter.mjs';
import recordsRouter from './routes/recordsRouter.mjs';

const app = express();

const corsConf = {
	"origin": "*",
  	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  	"preflightContinue": false,
  	"optionsSuccessStatus": 204,
	"allowedHeaders": "Content-Type,Authorization" 
}

app.use(cors(corsConf));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options('*');

app.use(userRouter);
app.use(categoriesRouter);
app.use(recordsRouter);

//MongoDB Connection
mongoose
	.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.kvw2gnc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
		useNewUrlParser: true
	}) 
	.then( () => console.log('Mongo has connected.'))
	.catch(err => console.log(err));

app.listen(process.env.PORT, () => {
	console.log(`Server has started on the Port: ${process.env.PORT}`);
});