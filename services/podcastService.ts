import axios from 'axios';
import { encode } from 'base64-arraybuffer';
import { SYSTEM_PROMPT } from '../constants/systemPrompt';
import Constants from 'expo-constants';

const { OPENAI_API_KEY, ELEVENLABS_API_KEY } = Constants.expoConfig?.extra ?? {};
const ELEVENLABS_VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ';

export async function createPodcast(
  title: string,
  minutes: string,
  narrativeType: string,
  description: string,
  updateStep: (index: number, done: boolean) => void
): Promise<string> {
  try {
    updateStep(0, false);
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Create a ${minutes}-minute ${narrativeType} podcast titled "${title}". Topic: ${description}`,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    updateStep(0, true);

    updateStep(1, false);
    const script = openaiResponse.data.choices[0].message.content;
    updateStep(1, true);

    updateStep(2, false);
    const elevenResponse = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
      {
        text: script,
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
    updateStep(2, true);

    updateStep(3, false);
    const audioData = elevenResponse.data;
    const base64Audio = encode(audioData);
    updateStep(3, true);

    return base64Audio;
  } catch (err) {
    console.error('❌ Error creating podcast:', err);
    throw err;
  }
}
