import mongoose from "mongoose";
import type { MongooseDocument } from "./MUtilTypes.js";
export interface User {
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    birthday: Date;
    username: string;
    hashedPass: string;
}
export interface DbUserResult extends User {
    _id: Object;
}
export type UserModelInstance = InstanceType<typeof UserModel>;
export declare class UserModel {
    schema: mongoose.Schema;
    model: mongoose.Model<MongooseDocument<User>>;
    constructor();
    findUser(username: string): Promise<(mongoose.Document<unknown, {}, MongooseDocument<User>, {}, {}> & User & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findUserSafe(username: string): Promise<(mongoose.Document<unknown, {}, MongooseDocument<User>, {}, {}> & User & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findUserById(id: string): Promise<(mongoose.Document<unknown, {}, MongooseDocument<User>, {}, {}> & User & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    addUser(input: User): Promise<mongoose.Document<unknown, {}, MongooseDocument<User>, {}, {}> & User & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=UserModel.d.ts.map