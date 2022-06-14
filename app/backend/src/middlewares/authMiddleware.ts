import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import TokenPayload from '../interfaces/tokenPayload';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  const superSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, superSecret) as TokenPayload;

    req.userId = decoded.id;

    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
