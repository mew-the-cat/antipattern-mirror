import { QueryInterface } from "sequelize";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    up: async (queryInterface: QueryInterface, Sequelize: any) => {
        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.TEXT('tiny'),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            password: {
                type: Sequelize.BLOB('tiny'),
                allowNull: false,
            },
            salt: {
                type: Sequelize.BLOB('tiny'),
                allowNull: false,
            },
            confirmation: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            signup_verified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            premium_end: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            created: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
            deleted: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });

    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable('Users');
    },
};
