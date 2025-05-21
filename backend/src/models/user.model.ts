import { prisma } from '../lib/prisma';

export const createUser = async ({
  googleId,
  email,
  name,
}: {
  googleId: string;
  email?: string | null;
  name?: string | null;
}) => {
  return prisma.user.create({
    data: {
      googleId,
      email: email ?? null,
      name: name ?? null,
    },
  });
};

export const findUserByGoogleId = async (googleId: string) => {
  return prisma.user.findUnique({ where: { googleId } });
};
