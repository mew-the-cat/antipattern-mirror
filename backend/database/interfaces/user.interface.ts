import {Optional} from "sequelize";

export interface UserAttributes {
    id: number;
    firstname: string;
    lastname: string;
    street: string;
    zip: string;
    location: string;
    email: string;
    password: Buffer;
    salt: Buffer;
    confirmation: boolean;
    signup_verified: boolean;
    created: Date;
    updated: Date;
    deleted?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created' | 'updated' | 'signup_verified'> {}