import {} from "express";
import { auth } from '../utils/auth.js';
import { fromNodeHeaders } from "better-auth/node";
export default async function checkAuth(req, res, next) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });
    if (!session) {
        res.status(401);
        return next(Error('User not authenticated.'));
    }
    else {
        return next();
    }
}
//# sourceMappingURL=CheckAuth.js.map