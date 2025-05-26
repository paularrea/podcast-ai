// import { Tabs } from 'expo-router';

// export default function TabsLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen name="index" options={{ title: 'Home' }} />
//       <Tabs.Screen name="library" options={{ title: 'My Library' }} />
//     </Tabs>
//   );
// }

// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { View, Pressable, Modal, Text } from 'react-native';
import { useState } from 'react';
import { useDripsyTheme } from 'dripsy';
import { Home, PlusCircle, Library, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const TabIconLabel = ({ Icon, label, color }) => (
  <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 50 }}>
    <Icon color={color} size={20} style={{ marginBottom: 4 }} />
    <Text style={{ color, fontSize: 12 }}>{label}</Text>
  </View>
);

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useDripsyTheme();
  const colors = theme.colors;
  const router = useRouter();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.muted,
            height: 60,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: '',
            tabBarIcon: ({ color }) => <TabIconLabel Icon={Home} label="Home" color={color} />,
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: '',
            tabBarIcon: ({ color }) => <TabIconLabel Icon={PlusCircle} label="Create" color={color} />,
            tabBarButton: (props) => (
              <Pressable
                {...props}
                onPress={() => setModalVisible(true)}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TabIconLabel Icon={PlusCircle} label="Create" color={colors.muted} />
              </Pressable>
            ),
          }}
        />

        <Tabs.Screen
          name="library"
          options={{
            title: '',
            tabBarIcon: ({ color }) => <TabIconLabel Icon={Library} label="Library" color={color} />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: '',
            tabBarIcon: ({ color }) => <TabIconLabel Icon={User} label="Profile" color={color} />,
          }}
        />
      </Tabs>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={{ flex: 1 }}
          onPressOut={() => setModalVisible(false)}>
          <BlurView
            intensity={90}
            tint="dark"
            style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View
              style={{
                backgroundColor: colors.secondary,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                padding: 24,
              }}>
              <ModalOption text="Create new Podcast" enabled onPress={() => {
                setModalVisible(false);
                router.push('/modal/createPodcast');
              }} />
              <ModalOption text="Create list of episodes" enabled={false} />
            </View>
          </BlurView>
        </Pressable>
      </Modal>
    </>
  );
}

function ModalOption({ text, enabled = true, onPress }) {
  const { theme } = useDripsyTheme();
  const colors = theme.colors;
  return (
    <Pressable
      onPress={enabled ? onPress : undefined}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        opacity: enabled ? 1 : 0.4,
      }}>
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: colors.muted,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 16,
        }}>
        <PlusCircle size={20} color={colors.text} />
      </View>
      <Text style={{ color: colors.text, fontSize: 16 }}>{text}</Text>
    </Pressable>
  );
}
