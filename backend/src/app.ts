import express, { type Request, type Response, type Application } from "express";
import { dbInstance } from "./m/M.js";
import userRouter from "./routes/User.js";
import cookieParser from "cookie-parser";

const app: Application = express();

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
  const result = await dbInstance.userModel.findUser();
  console.log(result);
  res.status(200).json({ message: 'success!' })
})

app.get('/error', (req: Request, res: Response) => {
  res.status(200).json({ message: 'error!' })
})

app.use('/user', userRouter);

app.listen(process.env.PORT);