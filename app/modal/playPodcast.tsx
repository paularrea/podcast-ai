import { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { Text, Pressable, useDripsyTheme } from 'dripsy';
import { X } from 'lucide-react-native';

export default function PlayPodcastModal() {
  const { fileUri, title } = useLocalSearchParams();
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { theme } = useDripsyTheme();
  const router = useRouter();
  const colors = theme.colors;

  const togglePlayback = async () => {
    if (Platform.OS === 'web') {
      if (!audioRef.current) return;
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
      return;
    }

    if (sound) {
      if (playing) {
        await sound.pauseAsync();
        setPlaying(false);
      } else {
        await sound.playAsync();
        setPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web') return;

    const loadSound = async () => {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: String(fileUri) },
        { shouldPlay: false }
      );
      setSound(playbackObject);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [fileUri]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 24,
      }}
    >
      {/* ❌ Close Button (always navigates to library) */}
      <Pressable
        onPress={() => router.replace('/(tabs)/library')}
        style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}
      >
        <X color={colors.text} size={28} />
      </Pressable>

      <Text
        sx={{ variant: 'text.heading', mb: 3, textAlign: 'center' }}
      >
        {title}
      </Text>

      {Platform.OS === 'web' ? (
        <audio
          ref={audioRef}
          controls
          src={String(fileUri)}
          style={{ width: 300 }}
        />
      ) : (
        <Pressable
          onPress={togglePlayback}
          sx={{
            bg: 'primary',
            px: 20,
            py: 12,
            borderRadius: 'lg',
            mt: 2,
          }}
        >
          <Text sx={{ color: 'background', fontWeight: 'bold' }}>
            {playing ? 'Pause' : 'Play'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
