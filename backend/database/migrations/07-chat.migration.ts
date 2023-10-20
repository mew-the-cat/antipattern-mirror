import { DataTypes, QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
  await queryInterface.createTable('Chats', {
    id:{
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    client_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    advisor_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      unique: true,
      allowNull: false,
      references: {
        model: 'Advisors',
        key: 'id',
      },
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

  await queryInterface.addConstraint('Chats', {
    type: 'unique',
    fields: ['client_id', 'advisor_id'],
    name: 'chats_unique_constraint_client_advisor', // Optional: benenne die Constraint, wenn du möchtest
  });

}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('Chats');
}