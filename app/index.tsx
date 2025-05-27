import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useRouter } from 'expo-router';
import { getIdToken } from './hooks/useIdToken';

export default function IndexRedirect() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await getIdToken();
          const res = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await res.json();
          console.log('✅ Backend user check:', json);

          router.replace('/(tabs)');
        } catch (error) {
          console.error('❌ Failed to contact backend:', error);
          Alert.alert('Backend Error', 'Unable to contact backend.');
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
