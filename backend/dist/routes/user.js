import express from "express";
const userRouter = express.Router();
userRouter.get("/", (req, res) => {
    res.status(200).json({ message: "successfully hit user endpoint!" });
});
userRouter.post("/signup", (req, res) => {
    res.status(200).json({ message: "singup endpoint!" });
});
export default userRouter;
//# sourceMappingURL=user.js.map