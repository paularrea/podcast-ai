import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useLibrary } from '../hooks/useLibrary';

export default function LibraryScreen() {
  const { podcasts, loading, reload } = useLibrary();
  const router = useRouter();

  const hasPodcasts = podcasts.length > 0;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {!hasPodcasts && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            No podcasts created yet.
          </Text>
          <Button
            title="➕ Create Your First Podcast"
            onPress={() => router.push('/modal/createPodcast')}
          />
        </View>
      )}

      {hasPodcasts && (
        <FlatList
          data={podcasts}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={reload}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/modal/playPodcast',
                  params: { fileUri: item.fileUri, title: item.title },
                })
              }
              style={{ marginBottom: 12, borderBottomWidth: 1, paddingBottom: 12 }}
            >
              <Text style={{ fontSize: 18 }}>{item.title}</Text>
              <Text style={{ fontSize: 12, color: '#666' }}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
