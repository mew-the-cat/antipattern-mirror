import {Model, DataTypes, Optional, Sequelize, CHAR} from 'sequelize';
import sequelize from "./sequelize";

import { User } from './user.model';
import {AdvisorAttributes, AdvisorCreationAttributes} from "../interfaces/advisor.interface";
import { Client } from './client.model';
import {Chat} from "./chat.model";

class Advisor extends Model<AdvisorAttributes, AdvisorCreationAttributes> implements AdvisorAttributes {
    public id!: number;
    public user_id!: number;
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public static associate() {
        Advisor.belongsTo(User, {foreignKey: 'user_id'});
        Advisor.belongsToMany(Client, {through: 'Chat', foreignKey: 'advisor_id', otherKey: 'client_id'});
        Advisor.belongsToMany(Client, {through: 'Match', foreignKey: 'advisor_id', otherKey: 'client_id'});

        Advisor.hasMany(Chat, {foreignKey: 'advisor_id'});
    }
}

Advisor.init(
    {
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
    },
    {
        sequelize,
        modelName: 'Advisor',
        timestamps: true,
        paranoid: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted',
    }
);

export { Advisor };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.