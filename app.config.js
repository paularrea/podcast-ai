import 'dotenv/config';

export default {
  expo: {
    name: "podcast-ai",
    slug: "podcast-ai",
    version: "1.0.0",
    extra: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
      API_URL: process.env.API_URL || 'http://localhost:5000',
    },
  },
};
