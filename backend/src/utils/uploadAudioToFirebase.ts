// import axios from 'axios';
// import { bucket } from '../lib/firebase';

// /**
//  * Uploads base64-encoded MP3 audio to Firebase Storage.
//  * @param base64 Raw base64 string (not data URI)
//  * @param filename Optional file name
//  * @returns Public URL to the uploaded file
//  */
// export async function uploadAudioBase64(
//   base64: string,
//   filename: string = `podcast_${Date.now()}.mp3`
// ): Promise<string> {
//   try {
//     const buffer = Buffer.from(base64, 'base64');
//     const file = bucket.file(filename);

//     await file.save(buffer, {
//       metadata: { contentType: 'audio/mpeg' },
//       resumable: false,
//       public: true,
//     });

//     await file.makePublic();
//     return `https://storage.googleapis.com/${bucket.name}/${filename}`;
//   } catch (err) {
//     console.error('❌ Firebase upload error:', err);
//     throw err;
//   }
// }

// /**
//  * Uploads an MP3 audio file from a remote URL to Firebase Storage.
//  * @param url Direct HTTP/HTTPS link to an MP3 file
//  * @param filename Optional file name
//  * @returns Public URL to the uploaded file
//  */
// export async function uploadAudioFromUrl(
//   url: string,
//   filename: string = `podcast_${Date.now()}.mp3`
// ): Promise<string> {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const buffer = Buffer.from(response.data);
//     const file = bucket.file(filename);

//     await file.save(buffer, {
//       metadata: { contentType: 'audio/mpeg' },
//       resumable: false,
//       public: true,
//     });

//     await file.makePublic();
//     return `https://storage.googleapis.com/${bucket.name}/${filename}`;
//   } catch (err) {
//     console.error('❌ Firebase upload error from URL:', err);
//     throw err;
//   }
// }
import axios from 'axios';
import { bucket } from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads base64-encoded MP3 audio to Firebase Storage.
 * @param base64 Raw base64 string (not data URI)
 * @param filename Optional file name
 * @returns Public URL to the uploaded file
 */
export async function uploadAudioBase64(
  base64: string,
  filename: string = `podcast_${Date.now()}.mp3`
): Promise<string> {
  try {
    const buffer = Buffer.from(base64, 'base64');
    const file = bucket.file(filename);

    await file.save(buffer, {
      metadata: { contentType: 'audio/mpeg' },
      resumable: false,
      public: true,
    });

    await file.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
  } catch (err) {
    console.error('❌ Firebase upload error:', err);
    throw err;
  }
}

/**
 * Uploads an MP3 audio file from a remote URL to Firebase Storage.
 * @param url Direct HTTP/HTTPS link to an MP3 file
 * @param filename Optional file name
 * @returns Public URL to the uploaded file
 */
export async function uploadAudioFromUrl(
  url: string,
  filename: string = `podcast_${Date.now()}.mp3`
): Promise<string> {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const file = bucket.file(filename);

    await file.save(buffer, {
      metadata: { contentType: 'audio/mpeg' },
      resumable: false,
      public: true,
    });

    await file.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
  } catch (err) {
    console.error('❌ Firebase upload error from URL:', err);
    throw err;
  }
}

/**
 * Uploads a Buffer directly to Firebase Storage (used for server-side generation).
 * @param buffer Raw MP3 audio buffer
 * @param filename Optional name
 * @returns Public URL
 */
export async function uploadAudioBuffer(
  buffer: Buffer,
  filename: string = `podcast-${uuidv4()}.mp3`
): Promise<string> {
  try {
    const file = bucket.file(filename);

    await file.save(buffer, {
      metadata: { contentType: 'audio/mpeg' },
      resumable: false,
      public: true,
    });

    await file.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
  } catch (err) {
    console.error('❌ Firebase upload error (buffer):', err);
    throw err;
  }
}
