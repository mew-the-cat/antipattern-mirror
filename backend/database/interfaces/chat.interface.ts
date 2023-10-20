import {Optional} from "sequelize";
import { Client } from "../models/client.model";
import { Advisor } from "../models/advisor.model";

export interface ChatAttributes {
    id: number;
    client_id?: Client
    advisor_id?: Advisor
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface ChatCreationAttributes extends Optional<ChatAttributes, 'id' | 'created' | 'updated'> {}