import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { env } from 'process';
import dotenv from 'dotenv';
import { router } from './routes';

const app = express();
dotenv.config();
app.use(bodyParser.json());

app.use((_, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

app.use('/api', router);

const PORT: number = 3000;
(async () => {
  try {
    await mongoose.connect(`${env.DB_LINK}`);
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
})();
