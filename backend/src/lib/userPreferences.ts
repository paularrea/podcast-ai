import { prisma } from './prisma';

export async function getUserVoiceEngine(userId: string): Promise<'elevenlabs' | 'polly'> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { voiceEngine: true },
  });

  const raw = user?.voiceEngine ?? 'ELEVENLABS';
  return raw.toLowerCase() as 'elevenlabs' | 'polly';
}

export async function setUserVoiceEngine(userId: string, engine: 'elevenlabs' | 'polly') {
  const enumValue = engine.toUpperCase() as 'POLLY' | 'ELEVENLABS';

  await prisma.user.update({
    where: { id: userId },
    data: { voiceEngine: enumValue },
  });
}
