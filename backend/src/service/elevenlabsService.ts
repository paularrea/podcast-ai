import axios from 'axios';
import { encode } from 'base64-arraybuffer';

const ELEVENLABS_VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

export const synthesizeElevenLabsSpeech = async (
  text: string
): Promise<Buffer> => {
  const res = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
    {
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: { stability: 0.5, similarity_boost: 0.5 },
    },
    {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      responseType: 'arraybuffer',
    }
  );

  return Buffer.from(res.data);
};
