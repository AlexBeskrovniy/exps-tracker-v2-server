import 'dotenv/config';
import mongoose from 'mongoose';
import { User } from "../../models/user.mjs";
// import { Record } from "../../models/record.mjs";
// import { Category } from "../../models/category.mjs";
import { fakeRecords } from "./factories/record-factory.mjs";
import { fakeCategories } from "./factories/category-factory.mjs";
import { fakeUsers } from "./factories/user-factory.mjs";

const seeder = async (array, model) => {
    await Promise.all(array.map(elem => model.create({...elem})));
}

const userTotal = (arr) => {
    let total = 0;
    arr.forEach((money) => {
        total += money.money;
    });
    return total;
};

const seed = async () => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.pqimp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true
        }, () => {
            console.log('Mongo has connected');
        });

        let users = await fakeUsers(3);
        console.log(users);
        users.map(user => {
            user.categories = fakeCategories(5);
        });
        await seeder(users, User);
        console.log("Users created");
        let trueUsers = await User.find( {} );
        trueUsers.map(user => {
            user.records = fakeRecords(50, user.categories);
            user.total = userTotal(user.records);
            user.save();
            console.log("User saved");
        });

        console.log('Database successfully seeded');
        mongoose.connection.close( () => {
            console.log('Mongo has disconnected');
        });
    } catch(err) {
        console.error(err);
    }
} 

seed();
    