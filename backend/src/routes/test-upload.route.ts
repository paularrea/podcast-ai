// src/routes/test-upload.route.ts
import express from 'express';
import axios from 'axios';
import { bucket } from '../lib/firebase';

const router = express.Router();

router.get('/upload-test-audio', async (_req, res) => {
  try {
    const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    const audioResponse = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(audioResponse.data);
    const filename = `test_${Date.now()}.mp3`;

    const file = bucket.file(filename);
    await file.save(buffer, {
      metadata: { contentType: 'audio/mpeg' },
      public: true,
      resumable: false,
    });

    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    return res.json({ success: true, publicUrl });
  } catch (err) {
    console.error('❌ Upload failed:', err);
    res.status(500).json({ error: 'Upload failed', details: err });
  }
});

export default router;
