import { Response } from 'express';
import { getUserPodcasts } from '../models/podcast.model';
import { AuthenticatedRequest } from '../types/authenticated-request';

export const list = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).send('Unauthorized');

  const podcasts = await getUserPodcasts(req.user.id);
  res.json(podcasts);
};
