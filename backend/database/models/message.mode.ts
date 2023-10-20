import { Model, DataTypes, Optional, Sequelize, BelongsToMany, BelongsTo } from 'sequelize';
import sequelize from "./sequelize";

import { User } from './user.model';
import {MessageAttributes, MessageCreationAttributes} from "../interfaces/message.interface";
import { Client } from './client.model';
import { Advisor } from './advisor.model';
import { Chat } from './chat.mode';

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
    public id!: number;
    
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    chat?: Chat;
    from?: User;
    message!: string;

    public static associations: {
        client: BelongsTo<Chat, Client>;
        advisor: BelongsTo<Chat, Advisor>;

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


Message.hasOne(Chat);
Message.hasOne(User);

export { Message };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.