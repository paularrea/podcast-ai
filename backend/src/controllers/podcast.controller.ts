// import { Response } from 'express';
// import { createPodcast, getUserPodcasts } from '../models/podcast.model';
// import { AuthenticatedRequest } from '../types/authenticated-request';

// export const create = async (req: AuthenticatedRequest, res: Response) => {
//   const { title, fileUri, duration } = req.body;
//   if (!req.user) return res.status(401).send('Unauthorized');

//   const podcast = await createPodcast({
//     title,
//     fileUri,
//     duration,
//     userId: req.user.id,
//   });

//   res.json(podcast);
// };

// export const list = async (req: AuthenticatedRequest, res: Response) => {
//   if (!req.user) return res.status(401).send('Unauthorized');

//   const podcasts = await getUserPodcasts(req.user.id);
//   res.json(podcasts);
// };
import { Response } from 'express';
import { getUserPodcasts } from '../models/podcast.model';
import { AuthenticatedRequest } from '../types/authenticated-request';

export const list = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).send('Unauthorized');

  const podcasts = await getUserPodcasts(req.user.id);
  res.json(podcasts);
};
