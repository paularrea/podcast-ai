import { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useApi } from '../../hooks/useApi';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { useDripsyTheme } from 'dripsy';

const engines: ('elevenlabs' | 'polly')[] = ['elevenlabs', 'polly'];

export default function ProfileScreen() {
  const { get, put } = useApi();
  const { theme } = useDripsyTheme();
  const colors = theme.colors;
  const router = useRouter();

  const [selectedEngine, setSelectedEngine] = useState<'elevenlabs' | 'polly'>('elevenlabs');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadEngine = async () => {
      try {
        const res = await get('/api/users/voice-engine');
        setSelectedEngine(res.engine);
        console.log('✅ Current voice engine:', res.engine);
      } catch (err) {
        console.error('❌ Failed to load voice engine:', err);
        Alert.alert('Error', 'Failed to load voice engine preference');
      } finally {
        setLoading(false);
      }
    };

    loadEngine();
  }, []);

  const handleUpdateEngine = async (engine: 'elevenlabs' | 'polly') => {
    try {
      setSaving(true);
      setSelectedEngine(engine);
      await put('/api/users/voice-engine', { voiceEngine: engine });
      console.log('✅ Engine updated to:', engine);
    } catch (err) {
      console.error('❌ Error updating voice engine:', err);
      Alert.alert('Error', 'Could not update engine preference');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      router.replace('/auth/login');
    } catch (err) {
      console.error('❌ Logout failed:', err);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: colors.background }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        Voice Engine Preference
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        engines.map((engine) => (
          <Pressable
            key={engine}
            onPress={() => handleUpdateEngine(engine)}
            style={{
              padding: 12,
              marginBottom: 12,
              borderWidth: 2,
              borderColor: selectedEngine === engine ? colors.primary : colors.border,
              borderRadius: 8,
              backgroundColor: selectedEngine === engine ? colors.primary : colors.secondary,
            }}
          >
            <Text
              style={{
                color: selectedEngine === engine ? colors.background : colors.text,
                fontWeight: '500',
                textAlign: 'center',
              }}
            >
              {engine === 'elevenlabs' ? 'ElevenLabs' : 'Amazon Polly'}
            </Text>
          </Pressable>
        ))
      )}

      <Pressable
        onPress={handleLogout}
        style={{
          marginTop: 40,
          backgroundColor: colors.error,
          padding: 14,
          borderRadius: theme.radii.xl,
        }}
      >
        <Text style={{ color: colors.background, textAlign: 'center', fontWeight: 'bold' }}>
          Log Out
        </Text>
      </Pressable>
    </View>
  );
}
