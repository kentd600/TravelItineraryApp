import { auth } from "../utils/auth.js";
import { fromNodeHeaders } from "better-auth/node";
export default async function AttachSession(req, res, next) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });
    if (session) {
        req.sessionToken = session.session.token;
        req.userId = session.user.id;
    }
    return next();
}
//# sourceMappingURL=AttachSession.js.map