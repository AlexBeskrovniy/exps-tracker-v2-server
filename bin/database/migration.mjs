import 'dotenv/config';
import mongoose from 'mongoose';
import { User } from '../../models/user.mjs';
import { Record } from '../../models/record.mjs';
import { Category } from '../../models/category.mjs';
import { Total } from '../../models/total.mjs';

const migrate = async (email) => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.pqimp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true
        }, () => {
            console.log('Mongo has connected');
       });
        const user = await User.findOne({ email });
        const records = await Record.find({});
        const categories = await Category.find({});
        const total = await Total.findOne({ name: 'Total' });

        await Promise.all(records.map(async (record) => {
                const category = await Category.findById(record.category);
                const newRecord = {
                    _id: record._id,
                    createdAt: record.createdAt,
                    money: record.money,
                    categoryID: category ? category._id : null,
                    categoryName: category ? category.name : null,
                    description: record.description
                };
            
            user.records.push(newRecord);
            
        }));

        categories.map(category => user.categories.push(category));
        user.total = total.totalSpent;
        await user.save();

        mongoose.connection.close( () => {
            console.log('Mongo has disconnected');
        });
    } catch(err) {
        console.error(err);
    }
}

migrate('alex@ex.ru');