import express, {} from "express";
import { dbInstance } from "./m/M.js";
import userRouter from "./routes/User.js";
import cookieParser from "cookie-parser";
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import locationRouter from "./routes/Location.js";
const app = express();
const rClient = createClient({
    username: process.env.REDIS_DEFAULT,
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
    }
});
rClient.on('error', err => console.log('Redis client error', err));
await rClient.connect();
export const redisStore = new RedisStore({
    client: rClient,
    prefix: 'wander:'
});
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