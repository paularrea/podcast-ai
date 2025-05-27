import { useState, useEffect } from 'react';
import { FlatList, View, Platform, Pressable as RNPressable } from 'react-native';
import { Text, Pressable, useDripsyTheme } from 'dripsy';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApi } from '../hooks/useApi';
import { getLibrary } from '../../services/libraryService';
import type { PodcastEntry } from '../../types/PodcastEntry';
import DeletePodcastModal from '../../components/DeletePodcastModal';

export default function LibraryScreen() {
  const [podcasts, setPodcasts] = useState<PodcastEntry[]>([]);
  const [selectedPodcast, setSelectedPodcast] = useState<PodcastEntry | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { get } = useApi();
  const { theme } = useDripsyTheme();
  const router = useRouter();

  const colors = theme.colors;

  const loadLibrary = async () => {
    try {
      const fetched = await get('/api/podcasts');
      setPodcasts(fetched);
    } catch (err) {
      console.error('❌ Failed to load podcasts:', err);
    }
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  const openPlayer = (entry: PodcastEntry) => {
    router.push({
      pathname: '/modal/playPodcast',
      params: { fileUri: entry.fileUri, title: entry.title },
    });
  };

  const openDeleteModal = (entry: PodcastEntry) => {
    setSelectedPodcast(entry);
    setConfirmDelete(true);
  };

  const handleDelete = async () => {
    if (!selectedPodcast) return;
    try {
      await fetch(`/api/podcasts/${selectedPodcast.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      setPodcasts((prev) => prev.filter((p) => p.id !== selectedPodcast.id));
      setSelectedPodcast(null);
      setConfirmDelete(false);
    } catch (err) {
      console.error('❌ Error deleting podcast:', err);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: colors.secondary }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 16 }}>
        My Library
      </Text>

      {podcasts.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.text, marginBottom: 12 }}>
            No podcasts created yet
          </Text>
          <Pressable
            onPress={() => router.push('/modal/createPodcast')}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: theme.radii.lg,
            }}
          >
            <Text style={{ color: colors.background, fontWeight: 'bold' }}>
              + Create Your First Podcast
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={podcasts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: colors.background,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={{ fontWeight: 'bold', color: colors.text }}>
                  {item.title}
                </Text>
                <Text style={{ color: colors.muted, marginTop: 4 }}>
                  {new Date(item.createdAt).toLocaleDateString()} • {item.minutes} min
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <RNPressable onPress={() => openPlayer(item)}>
                  <Ionicons name="play" size={24} color={colors.primary} />
                </RNPressable>
                <RNPressable onPress={() => openDeleteModal(item)}>
                  <Ionicons name="close" size={22} color={colors.muted} />
                </RNPressable>
              </View>
            </View>
          )}
        />
      )}

      <DeletePodcastModal
        visible={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </View>
  );
}
