import 'dotenv/config';

export default {
  expo: {
    name: "Podcast AI",
    slug: "podcast-ai",
    version: "1.0.0",
    sdkVersion: "53.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    ios: {
      bundleIdentifier: "com.paularrea.podcastai",
      googleServicesFile: "./GoogleService-Info.plist"
    },
    android: {
      package: "com.paularrea.podcastai"
    },
    plugins: ["expo-build-properties"],
    extra: {
      API_URL: process.env.API_URL,
      ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      eas: {
        projectId: "805fdd98-54ad-4814-a8bf-bdaf7db9a0b0"
      }
    }
  }
};
