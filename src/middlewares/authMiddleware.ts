import { NextFunction, Request, Response } from 'express';
import { env } from 'process';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Review } from '../models/review';

const secretKey: string = `${env.JWT_SECRET_KEY}`;

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.body.userId = (decoded as any).id;
    next();
  });
}

export async function authorizeReviewDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

    const userId = decodedToken.userId;
    const reviewId = req.params.reviewId;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.userId?.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized: You can only delete your own reviews' });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
