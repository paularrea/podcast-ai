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
//     // Decode base64
//     const buffer = Buffer.from(base64, 'base64');

//     // Create file reference
//     const file = bucket.file(filename);

//     // Save to Firebase Storage
//     await file.save(buffer, {
//       metadata: { contentType: 'audio/mpeg' },
//       resumable: false,
//       public: true,
//     });

//     // Make file publicly readable
//     await file.makePublic();

//     // Return public URL
//     return `https://storage.googleapis.com/${bucket.name}/${filename}`;
//   } catch (err) {
//     console.error('❌ Firebase upload error:', err);
//     throw err;
//   }
// }
import axios from 'axios';
import { bucket } from '../lib/firebase';

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
