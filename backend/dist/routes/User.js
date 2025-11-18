import express from "express";
import rateLimits from "../middleware/RateLimiter.js";
import { dbInstance } from "../m/M.js";
import {} from "../c/rest/ControllerUtility.js";
import { UserController } from "../c/rest/UserController.js";
import { UserModel } from "../m/UserModel.js";
const userRouter = express.Router();
const Errors = {
    11000: "Username taken."
};
const KNOWN_CODES = [11000];
function isKnownError(code) {
    return KNOWN_CODES.includes(code);
}
userRouter.use(rateLimits.autocomplete);
userRouter.get("/", (req, res) => {
    res.status(200).json({ message: "successfully hit user endpoint!" });
});
userRouter.post("/signup", async (req, res, next) => {
    const addResult = await UserController.AddUser(req);
    if (!addResult?.success) {
        return next(addResult?.error);
    }
    else if (addResult.success) {
        res.status(200).json({
            success: true,
            data: {
                firstName: addResult.data?.firstName,
                userName: addResult.data?.username,
                email: addResult.data?.email
            }
        });
    }
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
});
userRouter.post("/auth", (req, res, next) => {
});
export default userRouter;
//# sourceMappingURL=User.js.map