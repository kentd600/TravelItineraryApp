import express, { type Request, type Response, type Application, type NextFunction } from "express";
import { dbInstance } from "./m/M.js";
import userRouter from "./routes/User.js";
import cookieParser from "cookie-parser";
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';

const app: Application = express();

const rClient = createClient({
  username: process.env.REDIS_DEFAULT!,
  password: process.env.REDIS_PW!,
  socket: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!)
  }
})

rClient.on('error', err => console.log('Redis client error', err));

await rClient.connect();

export const redisStore = new RedisStore({
  client: rClient,
  prefix: 'wander:'
})

try {
  await dbInstance.connect();
} catch (err) {
  if (err instanceof Error) {
    console.log("Db connection failed: ", err.message);
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'success!' })
})

app.get('/error', (req: Request, res: Response) => {
  res.status(200).json({ message: 'error!' })
})

app.use('/user', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
})

app.listen(process.env.PORT);