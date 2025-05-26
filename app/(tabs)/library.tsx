import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text, Pressable } from 'dripsy';
import { useRouter } from 'expo-router';
import { useLibrary } from '../hooks/useLibrary';
import { useDripsyTheme } from 'dripsy';
import { Play } from 'lucide-react-native';

export default function LibraryScreen() {
  const { podcasts, loading, reload } = useLibrary();
  const router = useRouter();
  const { theme } = useDripsyTheme();
  const colors = theme.colors;

  const hasPodcasts = podcasts.length > 0;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text sx={{ variant: 'text.heading', mb: 4 }}>My Library</Text>

      {!hasPodcasts && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text sx={{ variant: 'text.heading', textAlign: 'center', mb: 4 }}>
            No podcasts created yet
          </Text>
          <Pressable
            onPress={() => router.push('/modal/createPodcast')}
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              px: 16,
              py: 12,
              borderRadius: 'lg',
              bg: 'primary',
            }}
          >
            <Text sx={{ color: 'background', fontWeight: 'bold' }}>➕ Create Your First Podcast</Text>
          </Pressable>
        </View>
      )}

      {hasPodcasts && (
        <FlatList
          data={podcasts}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={reload}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/modal/playPodcast',
                  params: { fileUri: item.fileUri, title: item.title },
                })
              }
              sx={{
                mb: 4,
                p: 4,
                borderRadius: 'lg',
                bg: 'secondary',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View sx={{ flex: 1 }}>
                <Text sx={{ fontWeight: 'bold', fontSize: 16, color: 'text', mb: 1 }}>{item.title}</Text>
                <Text sx={{ color: 'muted', fontSize: 12 }}>
                  {new Date(item.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  })} | {Math.floor((item.duration || 60) / 60)} min
                </Text>
              </View>
              <Play color={colors.primary} size={20} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
