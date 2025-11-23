import { z } from 'zod';
import bcrypt from 'bcrypt';
import { dbInstance } from '../../model/Models.js';
import { controllerResult } from './ControllerUtility.js';
export const UserController = {
    async getUser(req) {
        const { username } = req.body;
        const gotUser = await dbInstance.userModel.findUserSafe(username);
        return gotUser;
    }
};
//# sourceMappingURL=UserController.js.map