import {Optional} from "sequelize";
import { Chat } from "../models/chat.model";
import { User } from "../models/user.model";

export interface MessageAttributes {
    id: number;
    chat_id: number;
    from_id: number;
    message: string;
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface MessageCreationAttributes extends Optional<MessageAttributes, 'id' | 'created' | 'updated'> {}