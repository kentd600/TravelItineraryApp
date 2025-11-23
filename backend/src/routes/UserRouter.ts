import express from "express";
import rateLimits from "../middleware/RateLimiter.js";
import { auth } from "../utils/auth.js";
import { fromNodeHeaders } from "better-auth/node";


const userRouter = express.Router();

type dbErrors = 11000

const Errors: Record<dbErrors, string> = {
  11000: "Username taken."
}

const KNOWN_CODES = [11000] as const;

function isKnownError(code: number): code is dbErrors {
  return (KNOWN_CODES as readonly number[]).includes(code);
}

userRouter.use(rateLimits.autocomplete);

userRouter.get("/", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  })
  console.log(session);
  res.status(200).json({ message: "successfully hit user endpoint!" });
})

userRouter.post("/auth", (req, res, next) => {
  const { email, password } = req.body;
})

export default userRouter;