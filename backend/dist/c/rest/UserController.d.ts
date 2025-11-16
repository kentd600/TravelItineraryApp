import type { Request } from 'express';
import type { User } from '../../m/UserModel.js';
export interface ControllerResult<T> {
    success: boolean;
    error: Error | null;
    data: T | null;
}
export declare const UserController: {
    AddUser(req: Request): Promise<ControllerResult<null> | ControllerResult<import("mongoose").Document<unknown, {}, import("../../m/MUtilTypes.js").MongooseDocument<User>, {}, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }> | undefined>;
};
//# sourceMappingURL=UserController.d.ts.map