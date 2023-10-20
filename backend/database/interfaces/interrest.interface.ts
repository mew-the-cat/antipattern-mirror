import {Optional} from "sequelize";

export interface InterrestAttributes {
    id: number;
    name: string
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface InterrestCreationAttributes extends Optional<InterrestAttributes, 'id' | 'created' | 'updated'> {}