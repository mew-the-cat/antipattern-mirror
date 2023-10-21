import {Optional} from "sequelize";

export interface AdvisorAttributes {
    id: number;
    user_id: number;
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface AdvisorCreationAttributes extends Optional<AdvisorAttributes, 'id' | 'created' | 'updated'> {}