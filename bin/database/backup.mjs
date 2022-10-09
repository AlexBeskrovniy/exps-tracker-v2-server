import 'dotenv/config';
import mongoose from 'mongoose';
import { Record } from '../../models/record.mjs';
import { Category } from '../../models/category.mjs';
import { Total } from '../../models/total.mjs';

import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const backup = async () => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.pqimp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true
        }, () => {
            console.log('Mongo has connected');
       });
        const records = await Record.find({});
        const categories = await Category.find({});
        const total = await Total.findOne({ name: 'Total' });

        console.log(records.length);
        console.log(categories.length);
        console.log(total.length);

        fs.writeFileSync(path.join(__dirname, './backup/records.json'), JSON.stringify(records, null, '\t'));
        fs.writeFileSync(path.join(__dirname, './backup/categories.json'), JSON.stringify(categories, null, '\t'));
        fs.writeFileSync(path.join(__dirname, './backup/total.json'), JSON.stringify(total, null, '\t'));

        mongoose.connection.close( () => {
            console.log('Mongo has disconnected');
        });
    } catch(err) {
        console.error(err);
    }
}

backup();