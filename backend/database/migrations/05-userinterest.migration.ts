import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        // Erstelle die Userinterest Tabelle
        await queryInterface.createTable('Userinterests', {
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
            interest_id: {
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

        // Hinzufügen von Fremdschlüssel-Constraints
        await queryInterface.addConstraint('Userinterests', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'fk_userinterests_user_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        await queryInterface.addConstraint('Userinterests', {
            fields: ['interest_id'],
            type: 'foreign key',
            name: 'fk_userinterests_interest_id',
            references: {
                table: 'Interests',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        // Hinzufügen eines zusammengesetzten Indexes für user_id und interest_id
        //await queryInterface.addIndex('Userinterests', ['user_id', 'interest_id'], {
        //    unique: true,
        //});
    },

    down: async (queryInterface: QueryInterface) => {
        // Entfernen von Indizes und Constraints
        //await queryInterface.removeIndex('Userinterests', ['user_id', 'interest_id']);
        await queryInterface.removeConstraint('Userinterests', 'fk_userinterests_user_id');
        await queryInterface.removeConstraint('Userinterests', 'fk_userinterests_interest_id');

        // Lösche die Userinterests Tabelle
        await queryInterface.dropTable('Userinterests');
    },
};
