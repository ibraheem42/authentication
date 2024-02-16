import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';

import ApiRoutes from './routes';
import { ErrorHandler } from './middlewares';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({ extended: true })
);

app.use('/api', ApiRoutes)
app.use(ErrorHandler);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  try {
    await mongoose.connect(
      process.env.DATABASE_URL as string
    );
    console.log("Connected To Database");
  } catch (error) {
    console.log("Error to connect Database");
  }
});
