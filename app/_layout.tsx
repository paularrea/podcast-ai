import { DripsyProvider } from 'dripsy';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { theme } from '../theme';

export default function RootLayout() {
  return (
    <DripsyProvider theme={theme}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </DripsyProvider>
  );
}
