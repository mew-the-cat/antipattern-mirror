import {Optional} from "sequelize";
import { Chat } from "../models/chat.mode";
import { User } from "../models/user.model";

export interface MessageAttributes {
    id: number;
    chat?: Chat;
    from?: User;
    message: string;
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface MessageCreationAttributes extends Optional<MessageAttributes, 'id' | 'created' | 'updated'> {}