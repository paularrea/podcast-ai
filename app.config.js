import 'dotenv/config';

export default {
  expo: {
    name: "podcast-ai",
    slug: "podcast-ai",
    version: "1.0.0",
    extra: {
      API_URL: process.env.API_URL || 'http://localhost:5000',
    },
  },
};
