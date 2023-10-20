import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from "./sequelize";

import { User } from './user.model';
import { AdvisorType } from '../enums/advisortype.enum';
import { Permission } from '../enums/permission.enum';
import {AdvisorAttributes, AdvisorCreationAttributes} from "../interfaces/advisor.interface";

class Advisor extends Model<AdvisorAttributes, AdvisorCreationAttributes> implements AdvisorAttributes {
    public id!: number;
    public from_type!: FromType;
    public exploration_id?: number;
    public battle_id?: number;
    public team_id?: number;
    public advisor_type!: AdvisorType;
    public user_id!: number;
    public permission!: Permission;
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public static associate() {
        Advisor.belongsTo(User, {foreignKey: 'user_id',});
    }
}



const staff_types = Object.values(AdvisorType).filter(
    (v, i, a) => a.indexOf(v) === i
);

const permissions = Object.values(Permission).filter(
    (v, i, a) => a.indexOf(v) === i
);

Advisor.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        from_type: {
            type: DataTypes.ENUM(...from_types),
            allowNull: false,
        },
        exploration_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        battle_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        team_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        staff_type: {
            type: DataTypes.ENUM(...advisor_types),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        permission: {
            type: DataTypes.ENUM(...permissions),
            allowNull: false,
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        deleted: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Staff',
        timestamps: true,
        paranoid: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted',
    }
);



function buildIdSuffixMap(enumObject: Record<string, string>): Record<string, string> {
    const output: Record<string, string> = {};

    for (const key of Object.keys(enumObject)) {
        const value = enumObject[key];
        output[`${value}_id`] = value;
    }

    return output;
}

Advisor.addHook('beforeValidate', (advisor, options) => {
    const fromTypeMap = buildIdSuffixMap(FromType);
    const staffTypeMap = buildIdSuffixMap(AdvisorType);

    // Überprüfen Sie die progressor_type und progress_type Werte
    for (const [field, expectedType] of Object.entries(fromTypeMap)) {
        if (advisor.getDataValue(field as keyof AdvisorAttributes) && advisor.getDataValue("from_type") !== expectedType) {
            throw new Error(`Wenn ${field} einen Wert hat, muss progressor_type den Wert "${expectedType}" haben.`);
        }
    }

    for (const [field, expectedType] of Object.entries(staffTypeMap)) {
        if (advisor.getDataValue(field as keyof AdvisorAttributes) && advisor.getDataValue("staff_type") !== expectedType) {
            throw new Error(`Wenn ${field} einen Wert hat, muss progress_type den Wert "${expectedType}" haben.`);
        }
    }

    // Überprüfen Sie, ob mindestens eines der Felder einen Wert hat
    const hasAtLeastOneFrom = Object.keys(fromTypeMap).some(field => advisor.getDataValue(field as keyof AdvisorAttributes));
    const hasAtLeastOneStaff = Object.keys(staffTypeMap).some(field => advisor.getDataValue(field as keyof AdvisorAttributes));

    if (!hasAtLeastOneFrom) {
        const fieldsList = Object.keys(fromTypeMap).join(', ');
        throw new Error(`Mindestens eines der Felder ${fieldsList} muss einen Wert haben.`);
    }

    if (!hasAtLeastOneStaff) {
        const fieldsList = Object.keys(staffTypeMap).join(', ');
        throw new Error(`Mindestens eines der Felder ${fieldsList} muss einen Wert haben.`);
    }
});

export { Advisor };

// Bei belongsTo wird der foreignKey in der aufrufenden Tabelle gesucht. => A.belongsTo(B, {foreignKey: "C"}) Dann guckt man für C in A nach.
// Bei hasOne wird der foreignKey in der zugeordneten Tabelle (Target-Tabelle) gesucht. => A.hasOne(B, {foreignKey: "C"}) Dann guckt man für C in B nach.