import { z } from 'zod';
import bcrypt from 'bcrypt';
import { dbInstance } from '../../m/M.js';
const userSchema = z.object({
    email: z.email(),
    firstName: z.string(),
    middleName: z.optional(z.string()),
    lastName: z.string(),
    birthday: z.date(),
    username: z.string(),
    password: z.string().min(8)
});
function controllerResult(data, success = true, error = null) {
    return {
        data,
        success,
        error
    };
}
export const UserController = {
    async AddUser(req) {
        const { user } = req.body;
        if (!user)
            return controllerResult(null, false, new Error("User data absent in request body."));
        user.birthday = new Date(user.birthday);
        if (Number.isNaN(user.birthday.getDate()))
            return controllerResult(null, false, new Error("Invalid birthday."));
        const parseResult = userSchema.safeParse(user);
        if (!parseResult.success)
            return controllerResult(null, false, new Error("Invalid user data."));
        const hash = await bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS));
        try {
            const dbResult = await dbInstance.userModel.addUser({
                email: user.email,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                birthday: user.birthday,
                username: user.username,
                hashedPass: hash
            });
            return controllerResult(dbResult, true);
        }
        catch (err) {
            if (err instanceof Error)
                return controllerResult(null, false, err);
        }
    }
};
//# sourceMappingURL=UserController.js.map