import { QueryInterface } from 'sequelize';
import { faker } from '@faker-js/faker';

module.exports = {
    up: async (queryInterface: QueryInterface) => {

        await queryInterface.bulkInsert('Interests', [
            {
                name: 'Backen',
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                name: 'Fussball',
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                name: 'Fotografie',
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                name: 'Programmieren',
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                name: 'Lesen',
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                name: 'Yoga',
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                name: 'Reisen',
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                name: 'Malen',
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                name: 'Radfahren',
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                name: 'Autos',
                created: faker.date.past(),
                updated: faker.date.recent()
            }
        ]);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('Advisors', {}, {});
    },
};