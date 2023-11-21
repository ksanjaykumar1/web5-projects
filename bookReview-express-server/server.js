import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bookReview from './routes/bookReview.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

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
app.use('/api/v1/bookReview', bookReview);

app.use(notFound);
app.use(errorHandler);

const start = () => {
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
};

start();
