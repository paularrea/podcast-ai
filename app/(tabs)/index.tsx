import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'dripsy';
import { useRouter } from 'expo-router';
import { signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useApi } from '../../hooks/useApi';
import { useDripsyTheme } from 'dripsy';

export default function Home() {
  const router = useRouter();
  const { get } = useApi();
  const { theme } = useDripsyTheme();
  const colors = theme.colors;

  const [checking, setChecking] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setChecking(false);

      if (!user) {
        router.replace('/auth/login');
        return;
      }

      try {
        await get('/api/auth/me');
      } catch (err) {
        console.error('❌ Failed to fetch /me', err);
      }
    });

    return unsubscribe;
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: colors.background }}>
      <Text sx={{ variant: 'text.heading', textAlign: 'center', mb: 3 }}>
        Welcome {firebaseUser?.displayName || 'there'} 👋
      </Text>
      <Text sx={{ variant: 'text.body', textAlign: 'center', color: 'muted' }}>
        This is Podcast AI — your space to create short AI-generated podcasts, store them in your library, and play them anytime.
        Use the Create tab to get started, and check your Library to listen back!
      </Text>
    </View>
  );
}