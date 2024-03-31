import { info, error } from './logger';
import {User, IUser} from '../models/user';
import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
interface CustomRequest extends Request {
    token?: string; // Assuming token is a string
    user?: IUser
  }

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  info('Method:', req.method);
  info('Path:  ', req.url);
 // info('Body:  ', req.body)
  info('---');
  next();
};



export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (_req: Request, res: Response, err: Error, next: NextFunction) => {
  error(err.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  
  } else if (error.name ===  'JsonWebTokenError') {
    return res.status(400).json({ error: err.message });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired'    });
  }

  return next(error);
};

export const tokenExtractor = (req: CustomRequest, _res: Response, next: NextFunction) =>{
    const authorization = req.get('authorization'); //get token
    if (authorization && authorization.startsWith('Bearer ')){
        req.token= authorization.replace('Bearer ', ''); //remove bearer to only include token
    }

next();
};

export const userExtractor = async (req: CustomRequest, _res: Response, next: NextFunction) => {
  const token = req.token;
if (token)
{  
    try {
      if (!process.env.SECRET) {
        throw new Error('Secret key is not defined in the environment variables.');
      }
  const decodedToken = jsonwebtoken.verify(token, process.env.SECRET) as { id: string };
  const user= await User.findById(decodedToken.id);  
 // console.log(user)
  if (user) {
    req.user = user;
  } else {
    // Handle case where user is not found
    console.error('User not found for ID:', decodedToken.id);
  }
}
 catch (error) {
    // Handle token verification errors
    console.error('Token verification failed:', error);
  }

next();
}
};
