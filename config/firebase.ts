// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { Platform } from 'react-native';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDbh73B-xNRn9QhJh-5GL8R1TctNYDnB1Y',
//   authDomain: 'podcast-ai-68f33.firebaseapp.com',
//   projectId: 'podcast-ai-68f33',
//   storageBucket: 'podcast-ai-68f33.appspot.com',
//   messagingSenderId: '173535936976',
//   appId: '1:173535936976:web:73b28cfdc066bef39cf9d5',
//   measurementId: 'G-9K6SXY81WW',
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth, app };

// export const GOOGLE_CLIENT_ID =
//   '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: 'AIzaSyDbh73B-xNRn9QhJh-5GL8R1TctNYDnB1Y',
  authDomain: 'podcast-ai-68f33.firebaseapp.com',
  projectId: 'podcast-ai-68f33',
  storageBucket: 'podcast-ai-68f33.appspot.com',
  messagingSenderId: '173535936976',
  appId: '1:173535936976:web:73b28cfdc066bef39cf9d5',
  measurementId: 'G-9K6SXY81WW',
};

const app = initializeApp(firebaseConfig);

const isExpoGo = Constants.appOwnership === 'expo';
const isWeb = Platform.OS === 'web';

let auth;

if (!isExpoGo || isWeb) {
  auth = getAuth(app);
} else {
  // 🔧 Fake/mock auth object to avoid crashes in Expo Go
  auth = {
    onAuthStateChanged: () => {
      console.warn('Auth is disabled in Expo Go.');
      return () => {}; // mock unsubscribe
    },
    currentUser: null,
    signInWithEmailAndPassword: () => {
      throw new Error('Auth is disabled in Expo Go.');
    },
    signOut: () => {
      console.warn('Auth signOut called in Expo Go.');
    },
  };
}

export { auth, app };

export const GOOGLE_CLIENT_ID =
  '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com';
