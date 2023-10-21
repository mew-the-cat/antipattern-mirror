import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from "./sequelize";

import { User } from './user.model';
import { ClientType } from '../enums/clienttype.enum';
import { Permission } from '../enums/permission.enum';
import {ClientAttributes, ClientCreationAttributes} from "../interfaces/client.interface";
import {Advisor} from "./advisor.model";

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
    public id!: number;

    public user_id!: number;
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public static associate() {
        Client.belongsTo(User, {foreignKey: 'user_id',});
        Client.belongsToMany(Advisor, {through: 'Chat', foreignKey: 'client_id'});
        Client.belongsToMany(Advisor, {through: 'Match', foreignKey: 'client_id'});
    }
}

Client.init(
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
        modelName: 'Client',
        timestamps: true,
        paranoid: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted',
    }
);

export { Client };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.