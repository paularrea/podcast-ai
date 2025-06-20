import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { prisma } from '../lib/prisma';
import { uploadAudioBuffer } from '../utils/uploadAudioToFirebase';
import { generatePodcastScriptFromPrompt } from '../service/openaiService';
import { generatePodcastAudio } from '../service/generateAudioService';

const router = express.Router();

/**
 * POST /api/podcasts
 * New version: Full prompt-driven podcast generation
 */
router.post('/', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { topic, duration, style, voiceFormat, depth, prompt } = req.body;

    if (!topic || !duration || !style || !voiceFormat || !prompt || !req.user) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('📥 Request received:', { topic, duration, style });

    // Step 1: Generate script + title
    console.log('🧠 Generating script with OpenAI...');
    const { title, script } = await generatePodcastScriptFromPrompt({
      topic,
      duration,
      style,
      voiceFormat,
      depth,
      prompt,
    });

    console.log('✅ Script and title generated.');
    console.log(`Title: ${title}`);
    console.log('Script preview:', script.slice(0, 80));

    // Step 2: Generate Audio
    const audioBuffer = await generatePodcastAudio(req.user.id, script);

    // Step 3: Upload to Firebase
    const fileUri = await uploadAudioBuffer(audioBuffer);

    // Step 4: Save in DB
    const podcast = await prisma.podcast.create({
      data: {
        userId: req.user.id,
        title,
        fileUri,
        duration: parseInt(duration) * 60,
      },
    });

    return res.json({
      id: podcast.id,
      title,
      fileUri,
      createdAt: podcast.createdAt,
    });
  } catch (err) {
    console.error('❌ Podcast creation failed:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * GET /api/podcasts
 */
router.get('/', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) return res.status(401).send('Missing token');

    const podcasts = await prisma.podcast.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(podcasts);
  } catch (err) {
    console.error('❌ Failed to fetch podcasts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * DELETE /api/podcasts/:id
 */
router.delete('/:id', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;

    const podcast = await prisma.podcast.findUnique({
      where: { id },
    });

    if (!podcast || podcast.userId !== req.user?.id) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    await prisma.podcast.delete({ where: { id } });

    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    console.error('❌ Failed to delete podcast:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
