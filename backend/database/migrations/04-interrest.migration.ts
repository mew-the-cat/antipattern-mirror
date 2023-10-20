import {QueryInterface} from "sequelize";

module.exports = {
    up: async (queryInterface: QueryInterface, Sequelize: any) => {

        await queryInterface.createTable('Interrests', {
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
            created: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
            deleted: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });

        // Das ist ein Test! Das Feld fields in references wird so nicht erkannt, soll aber laut Doku vorhanden sein.
        // https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-addConstraint


    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable('Interrests');
    },
};