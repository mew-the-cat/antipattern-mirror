import { DataTypes, QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface, Sequelize: any): Promise<void> {
  await queryInterface.createTable('Matches', {
    client_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    advisor_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true, 
      allowNull: false,
      references: {
        model: 'Advisors',
        key: 'id',
      },
    },
    score: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    accepted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('Matches');
}