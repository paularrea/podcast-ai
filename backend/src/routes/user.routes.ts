import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { getUserVoiceEngine, setUserVoiceEngine } from '../lib/userPreferences';

const router = express.Router();

router.get('/voice-engine', authenticate, async (req: AuthenticatedRequest, res) => {
  const engine = await getUserVoiceEngine(req.user!.id);
  res.json({ engine });
});

router.put('/voice-engine', authenticate, async (req: AuthenticatedRequest, res) => {
  const { voiceEngine } = req.body;

  if (!['polly', 'elevenlabs'].includes(voiceEngine)) {
    return res.status(400).json({ message: 'Invalid voice engine' });
  }

  await setUserVoiceEngine(req.user!.id, voiceEngine);
  res.json({ success: true, voiceEngine });
});

export default router;
