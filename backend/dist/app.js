import express, {} from "express";
import cors from 'cors';
import { dbInstance } from "./model/Models.js";
import userRouter from "./routes/UserRouter.js";
import cookieParser from "cookie-parser";
import locationRouter from "./routes/LocationRouter.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.js";
const app = express();
try {
    await dbInstance.connect();
}
catch (err) {
    if (err instanceof Error) {
        console.log("Db connection failed: ", err.message);
    }
}
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', async (req, res) => {
    res.status(200).json({ message: 'success!' });
});
app.get('/error', (req, res) => {
    res.status(200).json({ message: 'error!' });
});
app.use('/user', userRouter);
app.use('/loc', locationRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.listen(process.env.PORT);
//# sourceMappingURL=app.js.map