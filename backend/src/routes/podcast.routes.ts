// import express from 'express';
// import { authenticate } from '../middleware/auth.middleware';
// import { prisma } from '../lib/prisma';
// import { uploadAudioBase64 } from '../utils/uploadAudioToFirebase';
// import { AuthenticatedRequest } from '../types/authenticated-request';

// const router = express.Router();

// /**
//  * POST /api/podcasts
//  * Create a new podcast entry and upload to Firebase Storage.
//  */
// router.post('/', authenticate, async (req: AuthenticatedRequest, res) => {
//   try {
//     const { title, base64Audio, duration } = req.body;

//     console.log('📥 Creating podcast with data:', { title, duration, hasAudio: !!base64Audio });
//     console.log('🔐 Authenticated user:', req.user);

//     if (!title || !base64Audio || !duration || !req.user) {
//       return res.status(400).json({ message: 'Missing fields' });
//     }

//     const publicUrl = await uploadAudioBase64(base64Audio);

//     const podcast = await prisma.podcast.create({
//       data: {
//         title,
//         duration,
//         fileUri: publicUrl,
//         userId: req.user.id,
//       },
//     });

//     console.log('✅ Podcast created:', podcast);
//     res.json(podcast);
//   } catch (err) {
//     console.error('❌ Podcast upload error:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// /**
//  * GET /api/podcasts
//  * Return all podcasts created by the authenticated user.
//  */
// router.get('/', authenticate, async (req: AuthenticatedRequest, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const podcasts = await prisma.podcast.findMany({
//       where: { userId: req.user.id },
//       orderBy: { createdAt: 'desc' },
//     });

//     console.log(`📤 Returning ${podcasts.length} podcast(s) for user ${req.user.id}`);
//     res.json(podcasts);
//   } catch (err) {
//     console.error('❌ Failed to fetch podcasts:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// export default router;
// backend/src/routes/podcast.routes.ts

import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { prisma } from '../lib/prisma';
import { uploadAudioBuffer } from '../utils/uploadAudioToFirebase';
import { generatePodcastScript } from '../../service/openaiService';
import { generatePodcastAudio } from '../../service/generateAudioService';

const router = express.Router();

/**
 * GET /api/podcasts
 * Returns all podcasts for the authenticated user
 */
router.get('/', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const podcasts = await prisma.podcast.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(podcasts);
  } catch (err) {
    console.error('❌ Failed to load podcasts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * POST /api/podcasts
 * Generates podcast from OpenAI + TTS and stores it
 */
router.post('/', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, minutes, narrativeType, description } = req.body;

    if (!title || !minutes || !narrativeType || !description || !req.user) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('📥 Request received:', { title, minutes, narrativeType });

    // 1. Generate script from OpenAI
    console.log('🧠 Generating script...');
    const script = await generatePodcastScript(title, minutes, narrativeType, description);
    console.log('✅ Script generated. Preview:', script.slice(0, 100));

    // 2. Synthesize audio
    console.log('🎧 Generating audio from script...');
    const audioBuffer = await generatePodcastAudio(req.user.id, script);

    // 3. Upload to Firebase
    console.log('☁️ Uploading audio to Firebase...');
    const publicUrl = await uploadAudioBuffer(audioBuffer);

    // 4. Save podcast entry
    const durationInSeconds = parseInt(minutes, 10) * 60;
    const podcast = await prisma.podcast.create({
      data: {
        title,
        duration: durationInSeconds,
        fileUri: publicUrl,
        userId: req.user.id,
      },
    });

    console.log('✅ Podcast created and stored in DB');

    res.json({
      title: podcast.title,
      fileUri: podcast.fileUri,
      createdAt: podcast.createdAt,
    });
  } catch (err) {
    console.error('❌ Failed to create podcast:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
