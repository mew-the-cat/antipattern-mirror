import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable('Interests', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.TEXT('tiny'),
                allowNull: false,
            },
            created: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            deleted: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable('Userinterest');
        await queryInterface.dropTable('Interests');
    },
};
