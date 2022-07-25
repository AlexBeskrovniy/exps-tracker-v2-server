import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { Category } from './models/category.mjs';
import { Record } from './models/record.mjs';
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

app.get('/api/categories', async (req, res) => {
    const categories = await Category.find( {} ).sort( {createdAt: -1} );
    res
        .status(200)
        .json(categories);
})

app.get('/api/records', async (req, res) => {
    const records = await Record.find( {} ).sort( {createdAt: -1} ).populate('category', 'name');
    res
        .status(200)
        .json(records);
});

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

//Create Category
app.post('/api/categories/create', async (req, res) => {
    try {
        const category = new Category({...req.body});
        await category.save();
        res
            .status(201)
            .json({...category._doc});
    } catch (err) {
        console.error(err)
        res.status(400).end();
    }
})

// //Update Category
app.put('/api/categories/edit', async (req, res) => {
    try {
        const editedRecord = await Category.findOneAndUpdate(
            { _id: req.body.id }, 
            req.body, 
            { new: true }
        );

        if (!editedRecord) {
        return res.status(400).end()
        }

        res.status(200).json({...editedRecord._doc});
    } catch (err) {
        console.error(err)
        res.status(400).end()
    }
})

//Delete Category
app.delete('/api/categories/delete', async (req, res) => {
    try {

        const deleted = await Category.findOneAndRemove({ _id: req.body.id });
   
        if (!deleted) {
        return res.status(400).end();
        }
        
        await Record.updateMany({category: deleted._id}, {$unset: {category: 1}});
        
        return res.status(200).json({id: deleted._id});
    } catch (err) {
        console.error(err);
        res.status(400).end();
    }	
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