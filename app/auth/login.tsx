// import React, { useState, useEffect } from 'react';
// import {
//   TextInput as RNTextInput,
//   TouchableOpacity as RNTouchableOpacity,
//   SafeAreaView as RNSafeAreaView,
// } from 'react-native';
// import { Text, View, ScrollView } from 'dripsy';
// import { useRouter } from 'expo-router';
// import { FontAwesome } from '@expo/vector-icons';
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithCredential,
// } from 'firebase/auth';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import { makeRedirectUri } from 'expo-auth-session';
// import { auth } from '../config/firebase';

// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError] = useState('');

//   const redirectUri = makeRedirectUri({ useProxy: true });

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com',
//     iosClientId: '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com',
//     androidClientId: '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com',
//     webClientId: '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com',
//     scopes: ['profile', 'email', 'openid'],
//     responseType: 'id_token',
//     redirectUri,
//   });

//   useEffect(() => {
//     const loginWithGoogle = async () => {
//       if (response?.type === 'success') {
//         const idToken = response.params?.id_token;
//         if (!idToken) return;

//         try {
//           const credential = GoogleAuthProvider.credential(idToken);
//           await signInWithCredential(auth, credential);
//           console.log('✅ Firebase login successful');
//           router.replace('/'); // Route to auth-check handler
//         } catch (err) {
//           console.error('🔥 Firebase login error:', err);
//         }
//       }
//     };

//     loginWithGoogle();
//   }, [response]);

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email.trim(), password);
//       router.replace('/');
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <RNSafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
//       <ScrollView
//         contentContainerStyle={{
//           flexGrow: 1,
//           justifyContent: 'center',
//           paddingHorizontal: 24,
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         <Text sx={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' }}>
//           Log in to PodcastAI
//         </Text>

//         <SocialButton
//           icon="google"
//           label="Continue with Google"
//           onPress={() => promptAsync()}
//           disabled={!request}
//         />
//         <SocialButton icon="facebook" label="Continue with Facebook" disabled />
//         <SocialButton icon="apple" label="Continue with Apple" disabled />

//         <View sx={{ height: 1, backgroundColor: '#444', marginVertical: 20 }} />

//         <Text sx={{ color: 'white', marginBottom: 4 }}>Email or username</Text>
//         <RNTextInput
//           placeholder="email@example.com"
//           placeholderTextColor="#888"
//           style={{
//             backgroundColor: '#222',
//             color: 'white',
//             paddingHorizontal: 16,
//             paddingVertical: 12,
//             borderRadius: 8,
//             marginBottom: 16,
//           }}
//           autoCapitalize="none"
//           keyboardType="email-address"
//           onChangeText={setEmail}
//           value={email}
//         />

//         <Text sx={{ color: 'white', marginBottom: 4 }}>Password</Text>
//         <View sx={{ position: 'relative' }}>
//           <RNTextInput
//             placeholder="Enter your password"
//             placeholderTextColor="#888"
//             style={{
//               backgroundColor: '#222',
//               color: 'white',
//               paddingHorizontal: 16,
//               paddingVertical: 12,
//               borderRadius: 8,
//               paddingRight: 40,
//             }}
//             secureTextEntry={!showPass}
//             onChangeText={setPassword}
//             value={password}
//           />
//           <RNTouchableOpacity
//             style={{ position: 'absolute', right: 12, top: 12 }}
//             onPress={() => setShowPass((prev) => !prev)}
//           >
//             <FontAwesome name={showPass ? 'eye-slash' : 'eye'} size={18} color="#ccc" />
//           </RNTouchableOpacity>
//         </View>

//         {!!error && <Text sx={{ color: 'red', marginTop: 8 }}>{error}</Text>}

//         <RNTouchableOpacity
//           style={{
//             backgroundColor: '#22c55e',
//             borderRadius: 8,
//             marginTop: 24,
//             paddingVertical: 12,
//             alignItems: 'center',
//           }}
//           onPress={handleLogin}
//         >
//           <Text sx={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Log In</Text>
//         </RNTouchableOpacity>

//         <RNTouchableOpacity style={{ marginTop: 16 }}>
//           <Text sx={{ textAlign: 'center', color: '#ccc' }}>Forgot your password?</Text>
//         </RNTouchableOpacity>

//         <RNTouchableOpacity style={{ marginTop: 24 }} onPress={() => router.push("auth/signup")}>
//           <Text sx={{ textAlign: 'center', color: 'white' }}>
//             Don’t have an account?{' '}
//             <Text sx={{ textDecorationLine: 'underline' }}>Sign up for PodcastAI</Text>
//           </Text>
//         </RNTouchableOpacity>
//       </ScrollView>
//     </RNSafeAreaView>
//   );
// }

// function SocialButton({ icon, label, disabled, onPress }: any) {
//   return (
//     <RNTouchableOpacity
//       disabled={disabled}
//       onPress={onPress}
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 9999,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         marginBottom: 12,
//         opacity: disabled ? 0.5 : 1,
//       }}
//     >
//       <FontAwesome name={icon} size={18} color="white" style={{ marginRight: 8 }} />
//       <Text sx={{ color: 'white', fontWeight: '500' }}>{label}</Text>
//     </RNTouchableOpacity>
//   );
// }
import React, { useState, useEffect } from 'react';
import { TextInput as RNTextInput, TouchableOpacity as RNTouchableOpacity, SafeAreaView } from 'react-native';
import { Text, View, ScrollView } from 'dripsy';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { auth } from '../config/firebase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const redirectUri = makeRedirectUri({ useProxy: true });

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '<GOOGLE_CLIENT_ID>',
    iosClientId: '<GOOGLE_CLIENT_ID>',
    androidClientId: '<GOOGLE_CLIENT_ID>',
    webClientId: '<GOOGLE_CLIENT_ID>',
    scopes: ['profile', 'email', 'openid'],
    responseType: 'id_token',
    redirectUri,
  });

  useEffect(() => {
    const loginWithGoogle = async () => {
      if (response?.type === 'success') {
        const idToken = response.params?.id_token;
        if (!idToken) return;
        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, credential);
        router.replace('/');
      }
    };
    loginWithGoogle();
  }, [response]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
        <Text sx={{ variant: 'text.heading', textAlign: 'center', mb: 24 }}>Log in to PodcastAI</Text>

        <SocialButton icon="google" label="Continue with Google" onPress={() => promptAsync()} disabled={!request} />
        <SocialButton icon="facebook" label="Continue with Facebook" disabled />
        <SocialButton icon="apple" label="Continue with Apple" disabled />

        <View sx={{ height: 1, bg: 'border', my: 20 }} />

        <Text sx={{ color: 'text', mb: 4 }}>Email or username</Text>
        <RNTextInput
          placeholder="email@example.com"
          placeholderTextColor="#999"
          style={{
            backgroundColor: '#1E1E1E',
            color: '#fff',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            marginBottom: 16,
          }}
          onChangeText={setEmail}
          value={email}
        />

        <Text sx={{ color: 'text', mb: 4 }}>Password</Text>
        <View sx={{ position: 'relative' }}>
          <RNTextInput
            placeholder="Enter your password"
            placeholderTextColor="#999"
            style={{
              backgroundColor: '#1E1E1E',
              color: '#fff',
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 8,
              paddingRight: 40,
            }}
            secureTextEntry={!showPass}
            onChangeText={setPassword}
            value={password}
          />
          <RNTouchableOpacity style={{ position: 'absolute', right: 12, top: 12 }} onPress={() => setShowPass(!showPass)}>
            <FontAwesome name={showPass ? 'eye-slash' : 'eye'} size={18} color="#ccc" />
          </RNTouchableOpacity>
        </View>

        {!!error && <Text sx={{ color: 'error', mt: 2 }}>{error}</Text>}

        <RNTouchableOpacity
          style={{
            backgroundColor: '#9B59B6',
            borderRadius: 8,
            marginTop: 24,
            paddingVertical: 12,
            alignItems: 'center',
          }}
          onPress={handleLogin}
        >
          <Text sx={{ color: 'background', fontWeight: 'bold', fontSize: 16 }}>Log In</Text>
        </RNTouchableOpacity>

        <RNTouchableOpacity style={{ marginTop: 16 }}>
          <Text sx={{ textAlign: 'center', color: 'muted' }}>Forgot your password?</Text>
        </RNTouchableOpacity>

        <RNTouchableOpacity style={{ marginTop: 24 }} onPress={() => router.push('auth/signup')}>
          <Text sx={{ textAlign: 'center', color: 'text' }}>
            Don’t have an account? <Text sx={{ textDecorationLine: 'underline' }}>Sign up for PodcastAI</Text>
          </Text>
        </RNTouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function SocialButton({ icon, label, disabled, onPress }: any) {
  return (
    <RNTouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <FontAwesome name={icon} size={18} color="white" style={{ marginRight: 8 }} />
      <Text sx={{ color: 'white', fontWeight: '500' }}>{label}</Text>
    </RNTouchableOpacity>
  );
}
