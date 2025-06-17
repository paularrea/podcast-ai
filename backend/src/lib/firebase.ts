// import admin from 'firebase-admin';
// import path from 'path';

// const serviceAccount = require(path.resolve(__dirname, '../../firebase-key.json'));

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   });
// }

// export const bucket = admin.storage().bucket();
// export default admin;

import admin from 'firebase-admin';

const serviceAccountBase64 = process.env.FIREBASE_KEY_BASE64;

if (!serviceAccountBase64) {
  throw new Error('FIREBASE_KEY_BASE64 env variable is not set.');
}

const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, 'base64').toString('utf-8')
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export const bucket = admin.storage().bucket();
export default admin;
