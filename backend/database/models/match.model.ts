import { Model, DataTypes, Optional, Sequelize, BelongsToMany, BelongsTo } from 'sequelize';
import sequelize from "./sequelize";

import { User } from './user.model';
import {MatchAttributes, MatchCreationAttributes} from "../interfaces/match.interface";
import { Client } from './client.model';
import { Advisor } from './advisor.model';
import {Interest} from "./interest.model";

class Match extends Model<MatchAttributes, MatchCreationAttributes> implements MatchAttributes {
    public id!: number;
    
    public score!: number;
    public accepted!: boolean;
    
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public client_id!: number;
    public advisor_id!: number;

    public static associate() {
        Match.belongsTo(Client, {foreignKey: 'client_id'});
        Match.belongsTo(Advisor, {foreignKey: 'advisor_id'});
    }
}

Match.init(
    {
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
    },
    {
        sequelize,
        modelName: 'Match',
        timestamps: true,
        paranoid: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted',
    }
);


// Match.hasOne(Client); -> Client hat match_id als foreignKey
// Match.hasOne(Advisor); -> Advisor hat match_id als foreignKey
// Ein Client kann mehrere Matches mit verschiedenen Advisors haben.
// Ein Advisor kann mehrere Matches mit verschiedenen Clients haben.
// n:m -> Bonustabelle

export { Match };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.