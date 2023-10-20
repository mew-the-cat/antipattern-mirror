import { Model, DataTypes, Optional, Sequelize, BelongsToMany, BelongsTo } from 'sequelize';
import sequelize from "./sequelize";

import { User } from './user.model';
import {ChatAttributes, ChatCreationAttributes} from "../interfaces/chat.interface";
import { Client } from './client.model';
import { Advisor } from './advisor.model';

class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
    public id!: number;
    
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public client?: Client;
    public advisor?: Advisor;

    public static associations: {
        client: BelongsTo<Chat, Client>;
        advisor: BelongsTo<Chat, Advisor>;

    }
}

Chat.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
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
        modelName: 'Match',
        timestamps: true,
        paranoid: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted',
    }
);


Chat.hasOne(Client);
Chat.hasOne(Advisor);

export { Chat };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.