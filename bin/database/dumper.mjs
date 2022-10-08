import 'dotenv/config';
import mongoose from 'mongoose';
import { User } from '../../models/user.mjs';

export const dump = async ([...models]) => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.pqimp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true
        }, () => {
            console.log('Mongo has connected');
       });
        await Promise.all(models.map(model => model.deleteMany( {} )));
            console.log('Transferred collections were successfully cleared');
        mongoose.connection.close( () => {
            console.log('Mongo has disconnected');
        });
    } catch(err) {
        console.error(err);
    }
}

dump([User]);