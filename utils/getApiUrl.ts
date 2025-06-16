import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const getApiUrl = (): string => {
  const baseUrl = Constants.expoConfig?.extra?.API_URL;

  // Android emulator quirk (10.0.2.2 reaches localhost of the host machine)
  if (!baseUrl && Platform.OS === 'android') {
    return 'http://10.0.2.2:5000';
  }

  return baseUrl || 'http://localhost:5000';
};
