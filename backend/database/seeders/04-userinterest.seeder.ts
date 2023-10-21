import { QueryInterface } from 'sequelize';
import { faker } from '@faker-js/faker';

module.exports = {
    up: async (queryInterface: QueryInterface) => {

        await queryInterface.bulkInsert('Userinterests', [
            {
                user_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                interest_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                interest_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                interest_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                interest_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                interest_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                interest_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                interest_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                interest_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                interest_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                interest_id: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            }
        ]);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('Userinterests', {}, {});
    },
};