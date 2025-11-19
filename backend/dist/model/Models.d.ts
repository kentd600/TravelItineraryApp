import { type UserModelInstance } from "./UserModel.js";
declare class wdrDb {
    userModel: UserModelInstance;
    constructor();
    connect(): Promise<void>;
}
export declare const dbInstance: wdrDb;
export {};
//# sourceMappingURL=Models.d.ts.map