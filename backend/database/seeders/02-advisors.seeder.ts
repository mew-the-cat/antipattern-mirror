import { QueryInterface } from 'sequelize';
import { User } from '../models/user.model'; // Pfad anpassen, falls notwendig
import { faker } from '@faker-js/faker';
import { Advisor } from '../models/advisor.model';

module.exports = {
    up: async (queryInterface: QueryInterface) => {

        await queryInterface.bulkInsert('Advisors', [
            {
                user_id: 1,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: 2,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: 3,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: 4,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: 5,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: 6,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: 7,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: 8,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: 9,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                user_id: 10,
                created: faker.date.past(),
                updated: faker.date.recent()
            }
        ]);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('Advisors', {}, {});
    },
};