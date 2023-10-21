import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable('Advisors', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
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

        // Falls Sie Fremdschlüsselbeziehungen definieren möchten:
        await queryInterface.addConstraint('Advisors', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'fk_user_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable('Advisors');
    },
};
