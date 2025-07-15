import { Request, Response, NextFunction } from 'express';
import { Log } from '../utils/logger';

export const loggingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req;

  
  await Log('backend', 'info', 'middleware', `Incoming ${method} request to ${originalUrl}`);

  
  const start = Date.now();

  res.on('finish', async () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';

    await Log(
      'backend',
      level,
      'middleware',
      `${method} ${originalUrl} responded with status ${status} in ${duration}ms`
    );
  });

  next();
};
