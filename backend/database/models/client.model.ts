import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from "./sequelize";

import { User } from './user.model';
import { ClientType } from '../enums/clienttype.enum';
import { Permission } from '../enums/permission.enum';
import {ClientAttributes, ClientCreationAttributes} from "../interfaces/client.interface";

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
    public id!: number;

    public client_type!: ClientType;
    public user_id!: number;
    public permission!: Permission;
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public static associate() {
        Client.belongsTo(User, {foreignKey: 'user_id',});
    }
}


const client_types = Object.values(ClientType).filter(
    (v, i, a) => a.indexOf(v) === i
);

const permissions = Object.values(Permission).filter(
    (v, i, a) => a.indexOf(v) === i
);

Client.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        exploration_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        battle_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        team_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        client_type: {
            type: DataTypes.ENUM(...client_types),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        permission: {
            type: DataTypes.ENUM(...permissions),
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



function buildIdSuffixMap(enumObject: Record<string, string>): Record<string, string> {
    const output: Record<string, string> = {};

    for (const key of Object.keys(enumObject)) {
        const value = enumObject[key];
        output[`${value}_id`] = value;
    }

    return output;
}

Client.addHook('beforeValidate', (client, options) => {
    const clientTypeMap = buildIdSuffixMap(ClientType);

    for (const [field, expectedType] of Object.entries(clientTypeMap)) {
        if (client.getDataValue(field as keyof ClientAttributes) && client.getDataValue("client_type") !== expectedType) {
            throw new Error(`Wenn ${field} einen Wert hat, muss progress_type den Wert "${expectedType}" haben.`);
        }
    }

    // Überprüfen Sie, ob mindestens eines der Felder einen Wert hat
    const hasAtLeastOneClient = Object.keys(clientTypeMap).some(field => client.getDataValue(field as keyof ClientAttributes));

    if (!hasAtLeastOneClient) {
        const fieldsList = Object.keys(clientTypeMap).join(', ');
        throw new Error(`Mindestens eines der Felder ${fieldsList} muss einen Wert haben.`);
    }
});

export { Client };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.