import { useEffect, useRef, useState } from 'react';
import { Platform, Text, View, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';

export default function PlayPodcastModal() {
  const { fileUri, title } = useLocalSearchParams();
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>

      {Platform.OS === 'web' ? (
        <>
          <audio ref={audioRef} controls src={String(fileUri)} style={{ width: 300 }} />
        </>
      ) : (
        <Button title={playing ? 'Pause' : 'Play'} onPress={togglePlayback} />
      )}
    </View>
  );
}
