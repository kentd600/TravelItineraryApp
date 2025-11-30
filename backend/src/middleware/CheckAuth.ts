import { type Request, type Response, type NextFunction } from "express";
import { auth } from '../utils/auth.js';
import { fromNodeHeaders } from "better-auth/node";

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  })
  if (!session) {
    res.status(401);
    return next(Error('User not authenticated.'));
  } else {
    return next();
  }
}