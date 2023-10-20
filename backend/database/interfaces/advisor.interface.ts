import {AdvisorType} from "../enums/advisortype.enum";
import {Permission} from "../enums/permission.enum";
import {Optional} from "sequelize";

export interface AdvisorAttributes {
    id: number;

    advisor_type: AdvisorType;
    user_id: number;
    permission: Permission;
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface AdvisorCreationAttributes extends Optional<AdvisorAttributes, 'id' | 'created' | 'updated'> {}