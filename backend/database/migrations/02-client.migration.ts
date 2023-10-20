import {QueryInterface} from "sequelize";
import {ClientType} from "../enums/clienttype.enum";
import {Permission} from "../enums/permission.enum";

module.exports = {
    up: async (queryInterface: QueryInterface, Sequelize: any) => {

        const client_types = Object.values(ClientType).filter(
            (v, i, a) => a.indexOf(v) === i
        );

        const permissions = Object.values(Permission).filter(
            (v, i, a) => a.indexOf(v) === i
        );

        await queryInterface.createTable('Clients', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            client_types: {
                type: Sequelize.ENUM(...client_types), // ToDo: Müsste das nicht eigentlich "owner" sein?
                allowNull: false,
            },
            permission: {
                type: Sequelize.ENUM(...permissions),
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


        await queryInterface.addConstraint('Clients', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'fk_user_id_client',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable('Clients');
    },
};