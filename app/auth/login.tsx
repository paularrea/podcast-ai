import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { auth } from '../config/firebase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();

  const redirectUri = makeRedirectUri({
    useProxy: true,
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com',
    iosClientId: '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com',
    androidClientId: '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com',
    webClientId: '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'openid'],
    responseType: 'id_token', 
    redirectUri,
  });

  useEffect(() => {
    const loginWithGoogle = async () => {
      if (response?.type === 'success') {
        console.log('✅ Google response:', response);

        // ✅ Leer el token desde params, no desde .authentication
        const idToken = response.params?.id_token;

        if (!idToken) {
          console.error('❌ No ID token found');
          return;
        }

        try {
          const credential = GoogleAuthProvider.credential(idToken);
          await signInWithCredential(auth, credential);
          console.log('✅ Firebase login successful');
          router.replace('/(tabs)');
        } catch (err) {
          console.error('🔥 Firebase login error:', err);
        }
      } else {
        console.log('⚠️ Google response type:', response?.type);
      }
    };

    loginWithGoogle();
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Sign in to Podcast AI</Text>
      <Button
        title="LOGIN WITH GOOGLE"
        disabled={!request}
        onPress={() => promptAsync()}
      />
      <Text style={{ marginTop: 20 }}>Waiting</Text>
    </View>
  );
}
