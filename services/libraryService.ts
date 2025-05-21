import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import type { PodcastEntry } from '../types/PodcastEntry';

// Internal in-memory list of podcast entries
const library: PodcastEntry[] = [];

/**
 * Adds a podcast entry to the in-memory library.
 * Inserts new entry at the top unless already added.
 */
export function addPodcastToLibrary(podcast: PodcastEntry) {
  library.unshift(podcast);
}

/**
 * Returns all podcast entries in memory.
 */
export function getLibrary(): PodcastEntry[] {
  return library;
}

/**
 * Preloads a test podcast:
 * - On native: downloads file to local storage if not cached.
 * - On web: uses direct remote URI.
 * Ensures only one instance of the test podcast is ever added.
 */
export async function preloadTestPodcast(): Promise<void> {
  const testMP3Url = 'https://archive.org/download/testmp3testfile/mpthreetest.mp3';
  const fileName = 'working_test.mp3';
  const uri = Platform.OS === 'web'
    ? testMP3Url
    : FileSystem.documentDirectory + fileName;

  // ✅ Prevent duplicate addition by checking URI
  const alreadyAdded = library.some(p => p.fileUri === uri);
  if (alreadyAdded) {
    console.log('🟡 Test podcast already in library — skipping preload');
    return;
  }

  // ✅ Web: just push remote URL
  if (Platform.OS === 'web') {
    console.log('🌐 Web detected — adding public MP3 URI only');
    addPodcastToLibrary({
      title: 'Test Audio Sample (Web)',
      fileUri: uri,
      createdAt: new Date().toISOString(),
      minutes: 1,
    });
    return;
  }

  // ✅ Native: download and cache locally
  try {
    const { exists, size } = await FileSystem.getInfoAsync(uri);
    const isValid = exists && typeof size === 'number' && size > 1000;

    if (!isValid) {
      console.log('⬇️ Downloading verified test MP3...');
      const { uri: downloaded } = await FileSystem.downloadAsync(testMP3Url, uri);
      console.log('✅ Test MP3 downloaded:', downloaded);
    } else {
      console.log('🧪 Using cached MP3 at:', uri);
    }

    addPodcastToLibrary({
      title: 'Test Audio Sample',
      fileUri: uri,
      createdAt: new Date().toISOString(),
      minutes: 1,
    });
  } catch (error) {
    console.error('❌ Error in preloadTestPodcast:', error);
  }
}
