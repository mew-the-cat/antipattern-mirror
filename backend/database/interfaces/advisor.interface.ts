import {FromType} from "../enums/fromtype.enum";
import {AdvisorType} from "../enums/advisortype.enum";
import {Permission} from "../enums/permission.enum";
import {Optional} from "sequelize";

export interface AdvisorAttributes {
    id: number;
    from_type: FromType;
    exploration_id?: number;
    battle_id?: number;
    team_id?: number;
    staff_type: StaffType;
    user_id: number;
    permission: Permission;
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface AdvisorCreationAttributes extends Optional<AdvisorAttributes, 'id' | 'created' | 'updated'> {}