import { Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request';

export const whoami = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  res.json({ userId: req.user.id });
};
