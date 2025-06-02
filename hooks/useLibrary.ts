import { useEffect, useState } from 'react';
import { useApi } from './useApi';
import {getIdToken} from "./useIdToken"

export interface Podcast {
  id: string;
  title: string;
  fileUri: string;
  duration: number;
  createdAt: string;
}

export const useLibrary = () => {
  const { get, post } = useApi();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLibrary = async () => {
    setLoading(true);
    try {
      const data = await get('/api/podcasts');
      setPodcasts(data);
    } catch (err) {
      console.error('❌ Failed to load podcasts:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPodcast = async (podcast: {
    title: string;
    fileUri: string;
    duration: number;
  }) => {
    try {
      const newPodcast = await post('/api/podcasts', podcast);
      setPodcasts((prev) => [newPodcast, ...prev]);
      return newPodcast;
    } catch (err) {
      console.error('❌ Failed to create podcast:', err);
    }
  };

  // useEffect(() => {
  //   loadLibrary();
  // }, []);

    useEffect(() => {
  const init = async () => {
    try {
      const token = await getIdToken();
      if (!token) return;
      await loadLibrary();
    } catch (e) {
      console.warn('🛑 Skipping podcast fetch: not logged in');
    }
  };
  init();
}, []);

  return {
    podcasts,
    loading,
    reload: loadLibrary,
    createPodcast,
  };
};
