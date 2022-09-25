import { faker } from '@faker-js/faker';
import moment from 'moment';
import { hashData } from '../../../utils/helpers.mjs';

export const fakeUsers = async (x) => {
    let fakeUsers = [];
    for (let i = 0; i < x; i++) {
        let user = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: await hashData("55555555"),
        }
        fakeUsers.push(user);
    };
    return fakeUsers;
};