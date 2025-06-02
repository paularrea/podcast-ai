import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { useDripsyTheme } from "dripsy";
import { Home, PlusCircle, Library, User } from "lucide-react-native";

const TabIconLabel = ({ Icon, label, color, iconOffset = 0 }) => (
  <View
    style={{
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 20,
      paddingBottom: 4,
    }}
  >
    <View style={{ marginBottom: 2, transform: [{ translateY: iconOffset }] }}>
      <Icon color={color} size={20} />
    </View>
    <Text style={{ color, fontSize: 12 }}>{label}</Text>
  </View>
);

export default function TabLayout() {
  const { theme } = useDripsyTheme();
  const colors = theme.colors;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.muted,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabIconLabel Icon={Home} label="Home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabIconLabel Icon={PlusCircle} label="Create" color={color} iconOffset={2} />
          ),
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabIconLabel Icon={Library} label="Library" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabIconLabel Icon={User} label="Profile" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
