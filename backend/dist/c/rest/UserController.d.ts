import type { Request } from 'express';
import type { User } from '../../m/UserModel.js';
export interface ControllerResult<T> {
    success: boolean;
    error: Error | null;
    data: T | null;
}
export declare const UserController: {
    AddUser(req: Request): Promise<ControllerResult<null> | ControllerResult<import("mongoose").Document<unknown, {}, import("../../m/MUtilTypes.js").MongooseDocument<User>, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }> | undefined>;
    GetUser(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("../../m/MUtilTypes.js").MongooseDocument<User>, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=UserController.d.ts.map