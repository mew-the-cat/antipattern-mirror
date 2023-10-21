import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        // Erstelle die Messages Tabelle
        await queryInterface.createTable('Messages', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            chat_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            from_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            message: {
                type: DataTypes.STRING,
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

        // Füge die Fremdschlüssel-Constraints hinzu
        await queryInterface.addConstraint('Messages', {
            fields: ['chat_id'],
            type: 'foreign key',
            name: 'fk_chat_id',
            references: {
                table: 'Chats',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        await queryInterface.addConstraint('Messages', {
            fields: ['from_id'],
            type: 'foreign key',
            name: 'fk_from_id',
            references: {
                table: 'Users',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    },

    down: async (queryInterface: QueryInterface) => {
        // Entferne zuerst die Fremdschlüssel-Constraints
        await queryInterface.removeConstraint('Messages', 'fk_chat_id');
        await queryInterface.removeConstraint('Messages', 'fk_from_id');

        // Dann lösche die Messages Tabelle
        await queryInterface.dropTable('Messages');
    },
};
