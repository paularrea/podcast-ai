import { View, Pressable, Text } from 'react-native';
import { useDripsyTheme } from 'dripsy';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CreateScreen() {
  const { theme } = useDripsyTheme();
  const colors = theme.colors;
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 8 }}>
        Let's create something!
      </Text>
      <Text style={{ color: colors.text, opacity: 0.7, marginBottom: 24 }}>
        Choose a creation option to get started:
      </Text>

      <CreateCard
        icon="mic-outline"
        title="Create New Podcast"
        description="Generate a new audio podcast using AI."
        onPress={() => router.push('/modal/createPodcast')}
      />

      <CreateCard
        icon="albums-outline"
        title="Create list of episodes"
        description="Organize multiple podcasts into a playlist."
        disabled
      />
    </View>
  );
}

function CreateCard({
  icon,
  title,
  description,
  onPress,
  disabled = false,
}: {
  icon: any;
  title: string;
  description: string;
  onPress?: () => void;
  disabled?: boolean;
}) {
  const { theme } = useDripsyTheme();
  const colors = theme.colors;

  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      style={{
        backgroundColor: colors.secondaryBg,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.muted,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 16,
        }}
      >
        <Ionicons name={icon} size={24} color={colors.text} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
          {title}
        </Text>
        <Text style={{ color: colors.text, fontSize: 14, opacity: 0.7 }}>{description}</Text>
      </View>
    </Pressable>
  );
}
