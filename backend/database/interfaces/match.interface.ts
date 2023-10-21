import {Optional} from "sequelize";
import { Client } from "../models/client.model";
import { Advisor } from "../models/advisor.model";

export interface MatchAttributes {
    id: number;
    client_id: number;
    advisor_id: number;
    accepted: boolean
    score: number;
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface MatchCreationAttributes extends Optional<MatchAttributes, 'id' | 'created' | 'updated'> {}