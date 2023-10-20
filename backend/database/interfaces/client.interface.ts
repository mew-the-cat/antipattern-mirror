import {ClientType} from "../enums/clienttype.enum";
import {Permission} from "../enums/permission.enum";
import {Optional} from "sequelize";

export interface ClientAttributes {
    id: number;
    client_type: ClientType;
    user_id: number;
    permission: Permission;
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | 'created' | 'updated'> {}