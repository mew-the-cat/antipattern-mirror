import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from "./sequelize";
import {Interest} from "./interest.mode";
import { User } from './user.model';

import {UserInterestAttributes, UserInterestCreationAttributes} from "../interfaces/userinterest.interface";


class UserInterest extends Model<UserInterestAttributes, UserInterestCreationAttributes> implements UserInterestAttributes {
    public id!: number;
    public user_id!: number;
    public interest_id!: number;
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public static associate() {
        UserInterest.belongsTo(User, {foreignKey: 'user_id'});
        UserInterest.belongsTo(Interest, {foreignKey: 'interest_id'})

    }
}

UserInterest.init(
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
        interest_id: {
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
        modelName: 'Userinterest',
        timestamps: true,
        paranoid: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted',
    }
);

export { UserInterest };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.