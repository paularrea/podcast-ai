import { Modal, View } from 'react-native';
import { Text, Pressable, useDripsyTheme } from 'dripsy';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeletePodcastModal({ visible, onClose, onConfirm }: Props) {
  const { theme } = useDripsyTheme();
  const colors = theme.colors;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
      >
        <View
          style={{
            backgroundColor: colors.secondary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 24,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text, marginBottom: 8 }}>
            Are you sure you want to delete this podcast?
          </Text>
          <Text style={{ color: colors.muted, marginBottom: 24 }}>
            This action cannot be undone and the audio will be permanently removed from your
            library.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <Pressable
              onPress={onClose}
              style={{
                backgroundColor: colors.muted,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: theme.radii.md,
              }}
            >
              <Text style={{ color: colors.text, fontWeight: 'bold' }}>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              style={{
                backgroundColor: colors.error,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: theme.radii.md,
              }}
            >
              <Text style={{ color: colors.background, fontWeight: 'bold' }}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
