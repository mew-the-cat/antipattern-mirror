import { Model, DataTypes, Optional, Sequelize, BelongsToMany, BelongsTo } from 'sequelize';
import sequelize from "./sequelize";

import { User } from './user.model';
import {MessageAttributes, MessageCreationAttributes} from "../interfaces/message.interface";
import { Client } from './client.model';
import { Advisor } from './advisor.model';
import { Chat } from './chat.model';

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
    public id!: number;

    chat_id!: number;
    from_id!: number;
    message!: string;
    
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public static associate() {
        Message.belongsTo(Chat, {foreignKey: 'chat_id'});
        Message.belongsTo(User, {foreignKey: 'from_id'});
    }
}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        chat_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        from_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
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
        modelName: 'Message',
        timestamps: true,
        paranoid: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted',
    }
);

export { Message };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.