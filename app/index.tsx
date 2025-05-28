import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, Platform } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useRouter } from 'expo-router';
import { getIdToken } from './hooks/useIdToken';
import Constants from 'expo-constants';

export default function IndexRedirect() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const API_URL = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await getIdToken();

          // 🛡️ Crash guard: Ensure token is present before fetch
          if (!token) {
            console.warn('🛑 No ID token available, redirecting to login.');
            router.replace('/auth/login');
            setChecking(false);
            return;
          }

          const res = await fetch(`${API_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error('Non-200 response');

          const json = await res.json();
          console.log('✅ Backend user check:', json);
          router.replace('/(tabs)');
        } catch (error) {
          console.error('❌ Failed to contact backend:', error);
          if (Platform.OS === 'web') {
            alert('Unable to contact backend.');
          } else {
            Alert.alert('Backend Error', 'Unable to contact backend.');
          }
          router.replace('/auth/login');
        }
      } else {
        router.replace('/auth/login');
      }

      setChecking(false);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

