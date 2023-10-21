import {Optional} from "sequelize";

export interface InterestAttributes {
    id: number;
    name: string
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface InterestCreationAttributes extends Optional<InterestAttributes, 'id' | 'created' | 'updated'> {}