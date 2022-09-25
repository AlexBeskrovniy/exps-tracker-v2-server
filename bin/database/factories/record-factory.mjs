import { faker } from '@faker-js/faker';
import moment from 'moment';

export const fakeRecords = (x, array) => {
    let fakeRecs = [];
    for (let i = 0; i < x; i++) {
        let category = faker.helpers.arrayElement(array)
        let fakeRec = {
            createdAt: faker.date.between(
                moment().startOf('month').subtract(1, 'month').toISOString(),
                moment().endOf('month').toISOString()
            ),
            money: faker.random.numeric(5),
            categoryID: category._id,
            categoryName: category.name,
            description: faker.lorem.sentences(2)
        }
    fakeRecs.push(fakeRec);
    }
    return fakeRecs;
}