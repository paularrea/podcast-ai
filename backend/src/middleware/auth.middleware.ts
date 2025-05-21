import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequest } from '../types/authenticated-request';
import admin from '../lib/firebase';

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).send('Missing token');
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const googleId = decoded.uid;

    let user = await prisma.user.findUnique({ where: { googleId } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId,
          email: decoded.email ?? null,
          name: decoded.name ?? null,
        },
      });
    }

    req.user = { id: user.id };
    next();
  } catch (err) {
    console.error('❌ Auth error:', err);
    res.status(401).send('Invalid token');
  }
};
