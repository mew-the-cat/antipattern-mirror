import { QueryInterface } from 'sequelize';
import { User } from '../models/user.model'; 
import { faker } from '@faker-js/faker';
import { Advisor } from '../models/advisor.model';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
     
        const [salt, hashedPassword] = User.hashPassword('examplePassword');

        await queryInterface.bulkInsert('Users', [
            {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                zip: faker.location.zipCode('#####'),
                location: faker.location.city(),
                street: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: hashedPassword,
                salt: salt, 
                confirmation: true,
                signup_verified: true,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                zip: faker.location.zipCode('#####'),
                location: faker.location.city(),
                street: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: hashedPassword,
                salt: salt, 
                confirmation: true,
                signup_verified: true,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                zip: faker.location.zipCode('#####'),
                location: faker.location.city(),
                street: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: hashedPassword,
                salt: salt, 
                confirmation: true,
                signup_verified: true,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                zip: faker.location.zipCode('#####'),
                location: faker.location.city(),
                street: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: hashedPassword,
                salt: salt, 
                confirmation: true,
                signup_verified: true,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                zip: faker.location.zipCode('#####'),
                location: faker.location.city(),
                street: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: hashedPassword,
                salt: salt, 
                confirmation: true,
                signup_verified: true,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                zip: faker.location.zipCode('#####'),
                location: faker.location.city(),
                street: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: hashedPassword,
                salt: salt, 
                confirmation: true,
                signup_verified: true,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                zip: faker.location.zipCode('#####'),
                location: faker.location.city(),
                street: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: hashedPassword,
                salt: salt, 
                confirmation: true,
                signup_verified: true,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                zip: faker.location.zipCode('#####'),
                location: faker.location.city(),
                street: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: hashedPassword,
                salt: salt, 
                confirmation: true,
                signup_verified: true,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                zip: faker.location.zipCode('#####'),
                location: faker.location.city(),
                street: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: hashedPassword,
                salt: salt, 
                confirmation: true,
                signup_verified: true,
                created: faker.date.past(),
                updated: faker.date.recent()
            },
            {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                zip: faker.location.zipCode('#####'),
                location: faker.location.city(),
                street: faker.location.streetAddress(),
                email: faker.internet.email(),
                password: hashedPassword,
                salt: salt, 
                confirmation: true,
                signup_verified: true,
                created: faker.date.past(),
                updated: faker.date.recent()
            }
        ]);
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('Users', {}, {});
    },
};