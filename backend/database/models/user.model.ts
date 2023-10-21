import {Model, DataTypes, Optional, Association, BelongsToMany} from 'sequelize';
import sequelize from "./sequelize"; // Make sure to import your Sequelize instance
import crypto from 'crypto';
import { Mail } from '../../services/mail.service';
import { Salt } from '../../services/salt.service';
import {UserAttributes, UserCreationAttributes} from "../interfaces/user.interface";
import { Interest } from './interest.mode';


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public zip!: string;
    public location!: string;
    public street!: string;
    public email!: string;
    public password!: Buffer;
    public salt!: Buffer;
    public confirmation!: boolean;
    public signup_verified!: boolean;
    public created!: Date;
    public updated!: Date;
    public deleted?: Date;

    public interests?: Interest[];


    public static associate() {
        User.belongsToMany(Interest, {through: 'Userinterest', foreignKey: 'user_id'});
    }

    static hashPassword(password: string) {
        const env = process.env.NODE_ENV || 'development';
        const salt = env === 'development' ? Buffer.from('userSaltuserSaltuserSaltuserSalt') : crypto.randomBytes(32);
        return [salt, crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256')];
    }

    static sendVerificationMail(user: User, options: any) {
        const verificationCode = crypto.createHash('md5').update(
            user.password.toString('hex').concat(user.salt.toString('hex')).concat(Salt.verification)
        ).digest('hex');

        Mail.send(
            user.email,
            '______________: Verifizierung deines Accounts!',
            Mail.createVerificationMail(user, verificationCode, false),
            Mail.createVerificationMail(user, verificationCode, true)
        )
            .then((smi) => {
                console.info('User Account registration verification mail sent with verification code: ' + verificationCode);
                options.transaction.commit();
            })
            .catch((reason) => {
                console.warn(new Error('User Account registration verification mail could not be sent: '), reason);
                options.transaction.rollback();
            });
    }

    static validatePassword(insecurePassword: string, user: User) {
        const securePassword = crypto.pbkdf2Sync(insecurePassword, user.salt, 310000, 32, 'sha256');
        return crypto.timingSafeEqual(user.password, securePassword);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        street: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        zip: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        location: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        salt: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        confirmation: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        signup_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        modelName: 'User',
        timestamps: true,
        paranoid: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted',
    }
);

export { User };