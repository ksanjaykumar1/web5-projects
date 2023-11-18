import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);
