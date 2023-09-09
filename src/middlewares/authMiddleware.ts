import { Request, Response } from 'express';
import { env } from 'process';
import jwt from 'jsonwebtoken';

const secretKey: string = `${env.JWT_SECRET_KEY}`;

export function verifyToken(req: Request, res: Response, next: () => void) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.body.userId = (decoded as any).id;
    next();
  });
}
