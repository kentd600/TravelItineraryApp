import mongoose from "mongoose";
import type { MongooseDocument } from "./MUtilTypes.js";
interface User {
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    birthday: Date;
    username: string;
    hashedPass: string;
}
export type UserModelInstance = InstanceType<typeof UserModel>;
export declare class UserModel {
    schema: mongoose.Schema;
    model: mongoose.Model<MongooseDocument<User>>;
    constructor();
    findUser(username: string): Promise<(mongoose.Document<unknown, {}, MongooseDocument<User>, {}, {}> & User & mongoose.Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    addUser(input: User): Promise<mongoose.Document<unknown, {}, MongooseDocument<User>, {}, {}> & User & mongoose.Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
export {};
//# sourceMappingURL=UserModel.d.ts.map