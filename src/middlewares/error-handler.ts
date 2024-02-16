import { NextFunction, Request, Response } from 'express';

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!process.env.IS_PRODUCTION) {
    res.status(500).json({ error: 'Internal Server Error' })
  } else {
    res.status(500).json({ error: err.message });
  }
}

export default ErrorHandler;
