import express, { type Request, type Response, type Application, type NextFunction } from "express";
import cors from 'cors';
import { dbInstance } from "./model/Models.js";
import userRouter from "./routes/UserRouter.js";
import cookieParser from "cookie-parser";
import locationRouter from "./routes/LocationRouter.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.js";
import itineraryRouter from "./routes/ItineraryRouter.js";

const app: Application = express();

try {
  await dbInstance.connect();
} catch (err) {
  if (err instanceof Error) {
    console.log("Db connection failed: ", err.message);
  }
}

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  //allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true
}));

app.all("/api/auth/{*any}", toNodeHandler(auth));

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

app.use('/loc', locationRouter);

app.use('/itinerary', itineraryRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.statusCode === 200) {
    res.status(500);
  }
  console.error(err.stack);
  res.send(err.message);
})

app.listen(process.env.PORT);