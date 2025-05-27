// import React, { useEffect, useState } from "react";
// import { SafeAreaView, TextInput as RNTextInput, Alert } from "react-native";
// import { Text, View, Pressable } from "dripsy";
// import { useRouter } from "expo-router";
// import { signOut } from "firebase/auth";
// import { auth } from "../config/firebase";
// import { useApi } from "../hooks/useApi";
// import Constants from "expo-constants";

// const ProfileScreen = () => {
//   const router = useRouter();
//   const { token } = useApi();
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState({
//     name: "",
//     lastname: "",
//     email: "",
//     dob: "",
//     gender: "",
//   });

//   const fetchProfile = async () => {
//     try {
//       const res = await fetch(`${Constants.expoConfig?.extra?.API_URL}/api/auth/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const json = await res.json();
//       setUser({
//         name: json.name || "",
//         lastname: json.lastname || "",
//         email: json.email || "",
//         dob: json.dob || "",
//         gender: json.gender || "",
//       });
//     } catch (err) {
//       Alert.alert("Error", "Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.replace("/auth/login");
//     } catch (error) {
//       Alert.alert("Logout failed");
//     }
//   };

//   const updateField = (field: keyof typeof user, value: string) => {
//     setUser((prev) => ({ ...prev, [field]: value }));
//   };

//   if (loading) return <Text sx={{ p: 4 }}>Loading...</Text>;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#181818" }}>
//       <View sx={{ px: 4, py: 5 }}>
//         <Text sx={{ variant: "text.heading", mb: 4 }}>My Profile</Text>

//         <Field label="First Name" value={user.name} onChange={(val) => updateField("name", val)} />
//         <Field label="Last Name" value={user.lastname} onChange={(val) => updateField("lastname", val)} />
//         <Field label="Email" value={user.email} editable={false} />
//         <Field label="Date of Birth" value={user.dob} onChange={(val) => updateField("dob", val)} />
//         <Field label="Gender" value={user.gender} onChange={(val) => updateField("gender", val)} />

//         <Pressable
//           sx={{
//             bg: "error",
//             borderRadius: "xl",
//             py: 3,
//             alignItems: "center",
//             mt: 5,
//           }}
//           onPress={handleLogout}
//         >
//           <Text sx={{ color: "background", fontWeight: "bold" }}>Log Out</Text>
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// };

// const Field = ({
//   label,
//   value,
//   onChange,
//   editable = true,
// }: {
//   label: string;
//   value: string;
//   onChange?: (val: string) => void;
//   editable?: boolean;
// }) => (
//   <View sx={{ mb: 4 }}>
//     <Text sx={{ color: "text", mb: 1 }}>{label}</Text>
//     <RNTextInput
//       style={{
//         backgroundColor: "#222",
//         color: "#fff",
//         paddingHorizontal: 16,
//         paddingVertical: 10,
//         borderRadius: 8,
//       }}
//       placeholderTextColor="#888"
//       editable={editable}
//       value={value}
//       onChangeText={onChange}
//     />
//   </View>
// );

// export default ProfileScreen;
// File: app/(tabs)/profile.tsx

// File: app/(tabs)/profile.tsx

import { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useApi } from '../hooks/useApi';
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
