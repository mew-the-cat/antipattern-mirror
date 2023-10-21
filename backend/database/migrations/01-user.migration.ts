import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        // Erstelle die User Tabelle
        await queryInterface.createTable('Users', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            firstname: {
                type: DataTypes.TEXT('tiny'),
                allowNull: false,
            },
            lastname: {
                type: DataTypes.TEXT('tiny'),
                allowNull: false,
            },
            street: {
                type: DataTypes.TEXT('tiny'),
                allowNull: false,
            },
            location: {
                type: DataTypes.TEXT('tiny'),
                allowNull: false,
            },
            zip: {
                type: DataTypes.TEXT('tiny'),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.BLOB,
                allowNull: false,
            },
            salt: {
                type: DataTypes.BLOB,
                allowNull: false,
            },
            confirmation: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            signup_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
        // Lösche die Users Tabelle
        await queryInterface.dropTable('Users');
    },
};
