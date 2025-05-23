import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { prisma } from '../lib/prisma';
import { uploadAudioBase64 } from '../utils/uploadAudioToFirebase';
import { AuthenticatedRequest } from '../types/authenticated-request';

const router = express.Router();

/**
 * POST /api/podcasts
 * Create a new podcast entry and upload to Firebase Storage.
 */
router.post('/', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, base64Audio, duration } = req.body;

    console.log('📥 Creating podcast with data:', { title, duration, hasAudio: !!base64Audio });
    console.log('🔐 Authenticated user:', req.user);

    if (!title || !base64Audio || !duration || !req.user) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const publicUrl = await uploadAudioBase64(base64Audio);

    const podcast = await prisma.podcast.create({
      data: {
        title,
        duration,
        fileUri: publicUrl,
        userId: req.user.id,
      },
    });

    console.log('✅ Podcast created:', podcast);
    res.json(podcast);
  } catch (err) {
    console.error('❌ Podcast upload error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET /api/podcasts
 * Return all podcasts created by the authenticated user.
 */
router.get('/', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const podcasts = await prisma.podcast.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`📤 Returning ${podcasts.length} podcast(s) for user ${req.user.id}`);
    res.json(podcasts);
  } catch (err) {
    console.error('❌ Failed to fetch podcasts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
