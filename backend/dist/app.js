import express, {} from "express";
import { dbInstance } from "./m/M.js";
import userRouter from "./routes/User.js";
import cookieParser from "cookie-parser";
const app = express();
try {
    await dbInstance.connect();
}
catch (err) {
    if (err instanceof Error) {
        console.log("Db connection failed: ", err.message);
    }
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', async (req, res) => {
    const result = await dbInstance.userModel.findUser("kento");
    console.log(result);
    res.status(200).json({ message: 'success!' });
});
app.get('/error', (req, res) => {
    res.status(200).json({ message: 'error!' });
});
app.use('/user', userRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.listen(process.env.PORT);
//# sourceMappingURL=app.js.map