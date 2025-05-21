import { prisma } from '../lib/prisma';

export const createPodcast = async ({
  title,
  fileUri,
  duration,
  userId,
}: {
  title: string;
  fileUri: string;
  duration: number;
  userId: string;
}) => {
  return prisma.podcast.create({
    data: {
      title,
      fileUri,
      duration,
      userId,
    },
  });
};

export const getUserPodcasts = async (userId: string) => {
  return prisma.podcast.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};
