import { Model, DataTypes, Optional, Sequelize, BelongsToMany } from 'sequelize';
import sequelize from "./sequelize";

import { User } from './user.model';
import {InterrestAttributes, InterrestCreationAttributes} from "../interfaces/interrest.interface";
import {Advisor} from "./advisor.model";

class Interest extends Model<InterrestAttributes, InterrestCreationAttributes> implements InterrestAttributes {
    public id!: number;
    public name!: string;
    
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public users?: User[];

    public static associate() {
        Interest.belongsToMany(User, {through: 'Userinterest', foreignKey: 'interest_id'});
    }
}

Interest.init(
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
        modelName: 'Interest',
        timestamps: true,
        paranoid: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted',
    }
);

export { Interest };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.