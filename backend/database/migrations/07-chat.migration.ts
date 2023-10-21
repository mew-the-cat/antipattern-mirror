import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Chats', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      advisor_id: {
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

    // Fremdschlüsselbeziehungen definieren
    await queryInterface.addConstraint('Chats', {
      fields: ['client_id'],
      type: 'foreign key',
      name: 'fk_client_id',
      references: {
        table: 'Clients',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Chats', {
      fields: ['advisor_id'],
      type: 'foreign key',
      name: 'fk_advisor_id',
      references: {
        table: 'Advisors',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Chats');
  },
};
