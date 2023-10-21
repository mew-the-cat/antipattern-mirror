import {Optional} from "sequelize";

export interface UserInterestAttributes {
    id: number;
    user_id: number;
    interest_id: number;
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface UserInterestCreationAttributes extends Optional<UserInterestAttributes, 'id' | 'created' | 'updated'> {}