import express from "express";
import rateLimits from "../middleware/RateLimiter.js";
import { dbInstance } from "../m/M.js";
import { MongoServerError } from "mongodb";
import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { UserController } from "../c/rest/UserController.js";

passport.use(new Strategy(function verify(username, password, cb) {
  try {
    const user = dbInstance.userModel.findUser(username);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error('Incorrect username or password.');
    }
  }
}))

const userRouter = express.Router();

type dbErrors = 11000

const Errors: Record<dbErrors, string> = {
  11000: "Username taken."
}

const KNOWN_CODES = [11000] as const;

function isKnownError(code: number): code is dbErrors {
  return (KNOWN_CODES as readonly number[]).includes(code);
}

userRouter.use(rateLimits.default);

userRouter.get("/", (req, res) => {
  res.status(200).json({ message: "successfully hit user endpoint!" });
})

userRouter.post("/signup", async (req, res, next) => {
  const addResult = await UserController.AddUser(req);
  if (!addResult?.success) next(addResult?.error);
  console.log(addResult);
  /*try {
    await dbInstance.userModel.addUser({
      email: "test@test.com",
      firstName: "Kento",
      middleName: "Ryan",
      lastName: "Date",
      birthday: new Date('1/3/1996'),
      username: 'testUser',
      hashedPass: 'potato'
    })
    res.status(200).json({ message: "singup endpoint!" });
  } catch (err) {
    if (err instanceof MongoServerError && isKnownError(err.errorResponse.code)) {
      console.log(Errors[err.errorResponse.code])
    }
  }
  */
})

userRouter.post("/auth", (req, res) => {
  res.status(200).json({ message: "here is your token!" });
})

export default userRouter;