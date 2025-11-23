import type { Request } from 'express';
import type { User } from '../../model/UserModel.js';
export declare const UserController: {
    getUser(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("../../model/MUtilTypes.js").MongooseDocument<User>, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=UserController.d.ts.map