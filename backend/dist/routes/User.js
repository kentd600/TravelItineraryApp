import express from "express";
import rateLimits from "../middleware/RateLimiter.js";
import { dbInstance } from "../m/M.js";
import { MongoServerError } from "mongodb";
const userRouter = express.Router();
const Errors = {
    11000: "Username taken."
};
const KNOWN_CODES = [11000];
function isKnownError(code) {
    return KNOWN_CODES.includes(code);
}
userRouter.use(rateLimits.default);
userRouter.get("/", (req, res) => {
    res.status(200).json({ message: "successfully hit user endpoint!" });
});
userRouter.post("/signup", async (req, res) => {
    try {
        await dbInstance.userModel.addUser({
            email: "test@test.com",
            firstName: "Kento",
            middleName: "Ryan",
            lastName: "Date",
            birthday: new Date('1/3/1996'),
            username: 'testUser',
            hashedPass: 'potato'
        });
        res.status(200).json({ message: "singup endpoint!" });
    }
    catch (err) {
        if (err instanceof MongoServerError && isKnownError(err.errorResponse.code)) {
            console.log(Errors[err.errorResponse.code]);
        }
    }
});
export default userRouter;
//# sourceMappingURL=User.js.map