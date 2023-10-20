import { DataTypes, QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
  await queryInterface.createTable('Messages', {
    id:{
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    chat_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      unique: true,
      allowNull: false,
      references: {
        model: 'Chats',
        key: 'id',
      },
    },
    from: {
      type: Sequelize.INTEGER.UNSIGNED,
      unique: true,
      allowNull: false,
      references: {
        model: 'Users',
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

}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('Messages');
}