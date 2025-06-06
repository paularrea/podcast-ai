import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_POLLY_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_POLLY_SECRET_ACCESS_KEY,
});

const polly = new AWS.Polly();

export const synthesizePollySpeech = async (text: string): Promise<Buffer> => {
  const params: AWS.Polly.SynthesizeSpeechInput = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Joanna',
    Engine: 'neural',
    LanguageCode: 'en-US',
  };

  const result = await polly.synthesizeSpeech(params).promise();

  if (!result.AudioStream) {
    throw new Error('No audio returned from Polly');
  }

  return Buffer.from(result.AudioStream as Buffer);
};
