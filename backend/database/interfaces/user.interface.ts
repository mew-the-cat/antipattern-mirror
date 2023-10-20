import {Optional} from "sequelize";

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: Buffer;
    salt: Buffer;
    confirmation: boolean;
    signup_verified: boolean;
    premium_end?: Date;
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created' | 'updated' | 'signup_verified'> {}