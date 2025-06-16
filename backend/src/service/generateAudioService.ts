import { getUserVoiceEngine } from '../lib/userPreferences';
import { synthesizePollySpeech } from './pollyService';
import { synthesizeElevenLabsSpeech } from './elevenlabsService';

export async function generatePodcastAudio(
  userId: string,
  script: string
): Promise<Buffer> {
  const engine = await getUserVoiceEngine(userId);

  console.log(`🎙 Using ${engine} for TTS`);
  if (engine === 'polly') {
    return await synthesizePollySpeech(script);
  } else {
    return await synthesizeElevenLabsSpeech(script);
  }
}
