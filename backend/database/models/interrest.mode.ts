import { Model, DataTypes, Optional, Sequelize, BelongsToMany } from 'sequelize';
import sequelize from "./sequelize";

import { User } from './user.model';
import {InterrestAttributes, InterrestCreationAttributes} from "../interfaces/interrest.interface";

class Interrest extends Model<InterrestAttributes, InterrestCreationAttributes> implements InterrestAttributes {
    public id!: number;
    public name!: string;
    
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public users?: User[];

    public static associations: {
        users: BelongsToMany<Interrest, User>;
    }
}

Interrest.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT('tiny'),
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
        modelName: 'Interrest',
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

Interrest.addHook('beforeValidate', (interrrest, options) => {
   
});

Interrest.belongsToMany(User, {through: 'User_Interrest'});

export { Interrest };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.