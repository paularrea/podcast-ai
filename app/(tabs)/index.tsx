import { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useApi } from '../hooks/useApi';

export default function Home() {
  const router = useRouter();
  const { get } = useApi();

  const [checking, setChecking] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [backendUserId, setBackendUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setChecking(false);

      if (!user) {
        router.replace('/auth/login');
        return;
      }

      // 👇 Fetch backend user data (DB user ID)
      try {
        const res = await get('/api/auth/me');
        console.log('🧠 Authenticated DB user:', res);
        setBackendUserId(res.userId);
      } catch (err) {
        console.error('❌ Failed to fetch /me', err);
        setBackendUserId(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('✅ Signed out');
    } catch (err) {
      console.error('❌ Logout failed:', err);
    }
  };

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Welcome to Podcast AI</Text>
      <Text style={{ marginVertical: 12 }}>
        Firebase: {firebaseUser?.email || 'Unknown'}
      </Text>
      <Text style={{ marginBottom: 12 }}>
        User ID: {backendUserId || 'Unknown'}
      </Text>
      <Button title="Create New Podcast" onPress={() => router.push('/modal/createPodcast')} />
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}
