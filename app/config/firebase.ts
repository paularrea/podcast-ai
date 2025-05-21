import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
export const auth = getAuth(app);
export const GOOGLE_CLIENT_ID =
  '1019704937264-5mh4quehvc9tg64p9ija2ksc5orct8sk.apps.googleusercontent.com';
