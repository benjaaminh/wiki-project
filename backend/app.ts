import { MONGODB_URI } from './utils/config';
import express from 'express';

require('express-async-errors');
const app = express();
import cors from 'cors';
import usersRouter from './controllers/users';
import loginRouter from './controllers/login';
import postsRouter from './controllers/posts';
import { requestLogger, unknownEndpoint, tokenExtractor, userExtractor, errorHandler } from './utils/middleware';
import { info } from './utils/logger';
import mongoose from 'mongoose';
import { IUser } from './models/user';

declare global {
  namespace Express {
    interface Request {
      user: IUser
      token: string
    }
  }
}

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1); // Exit the process if MONGODB_URI is not defined
}
info('connecting to', MONGODB_URI);
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
app.use(cors());

app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);

app.use('/api/posts', userExtractor, postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}


app.use(unknownEndpoint);
app.use(errorHandler);

export default app;