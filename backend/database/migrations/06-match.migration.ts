import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Erstelle die Matches Tabelle
    await queryInterface.createTable('Matches', {
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
      score: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.addConstraint('Matches', {
      fields: ['client_id'],
      type: 'foreign key',
      name: 'fk_client_id',
      references: {
        table: 'Clients',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Matches', {
      fields: ['advisor_id'],
      type: 'foreign key',
      name: 'fk_advisor_id',
      references: {
        table: 'Advisors',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    // Entferne zuerst die Fremdschlüssel-Constraints
    await queryInterface.removeConstraint('Matches', 'fk_client_id');
    await queryInterface.removeConstraint('Matches', 'fk_advisor_id');

    // Dann lösche die Matches Tabelle
    await queryInterface.dropTable('Matches');
  },
};
