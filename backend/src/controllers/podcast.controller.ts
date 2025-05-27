// import { Response } from 'express';
// import { getUserPodcasts } from '../models/podcast.model';
// import { AuthenticatedRequest } from '../types/authenticated-request';

// export const list = async (req: AuthenticatedRequest, res: Response) => {
//   if (!req.user) return res.status(401).send('Unauthorized');

//   const podcasts = await getUserPodcasts(req.user.id);
//   res.json(podcasts);
// };
import { Response } from 'express';
import { getUserPodcasts } from '../models/podcast.model';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { getUserVoiceEngine } from '../lib/userPreferences';
import { synthesizePollySpeech } from '../../service/pollyService';
import { synthesizeElevenLabsSpeech } from '../../service/elevenlabsService';
import { uploadAudioBase64 } from '../utils/uploadAudioToFirebase';
import { prisma } from '../lib/prisma';

export const list = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).send('Unauthorized');

  const podcasts = await getUserPodcasts(req.user.id);
  res.json(podcasts);
};

export const create = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).send('Unauthorized');

  try {
    const { title, description, minutes, narrativeType } = req.body;
    const userId = req.user.id;

    // Step 1: Generate podcast script (replace with actual GPT logic)
    const script = `Generate a ${narrativeType} podcast titled "${title}":\n${description}`;

    // Step 2: Get voice engine preference from DB
    const engine = await getUserVoiceEngine(userId);

    // Step 3: Generate audio
    const audioBuffer =
      engine === 'polly'
        ? await synthesizePollySpeech(script)
        : await synthesizeElevenLabsSpeech(script);

    const base64Audio = audioBuffer.toString('base64');

    // Step 4: Upload to Firebase (or other storage)
    const fileUri = await uploadAudioBase64(base64Audio);

    // Step 5: Store podcast entry in DB
    const podcast = await prisma.podcast.create({
      data: {
        userId,
        title,
        fileUri,
        duration: parseInt(minutes, 10) * 60,
      },
    });

    res.status(200).json({ success: true, podcast });
  } catch (error) {
    console.error('❌ Error creating podcast:', error);
    res.status(500).json({ success: false, message: 'Failed to generate podcast' });
  }
};
