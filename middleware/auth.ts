import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretOrKey = process.env.JWT_SECRET || 'my-secret-key';

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], secretOrKey);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}
