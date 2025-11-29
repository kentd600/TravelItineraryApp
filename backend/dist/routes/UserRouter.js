import express, { Router } from "express";
import rateLimits from "../middleware/RateLimiter.js";
import checkAuth from "../middleware/CheckAuth.js";
const userRouter = express.Router();
userRouter.use(rateLimits.autocomplete);
userRouter.use(checkAuth);
userRouter.get("/", async (req, res) => {
    res.status(200).json({ message: 'success!' });
});
export default userRouter;
//# sourceMappingURL=UserRouter.js.map