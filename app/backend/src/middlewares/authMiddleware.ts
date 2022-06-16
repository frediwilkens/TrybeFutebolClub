import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import TokenPayload from '../interfaces/TokenPayload';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const superSecret = await fs.readFile('jwt.evaluation.key', 'utf-8');
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(token, superSecret) as TokenPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};

export default authMiddleware;
