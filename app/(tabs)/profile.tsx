import React, { useEffect, useState } from "react";
import { SafeAreaView, TextInput as RNTextInput, Alert } from "react-native";
import { Text, View, Pressable } from "dripsy";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useApi } from "../hooks/useApi";
import Constants from "expo-constants";

const ProfileScreen = () => {
  const router = useRouter();
  const { token } = useApi();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    dob: "",
    gender: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${Constants.expoConfig?.extra?.API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      setUser({
        name: json.name || "",
        lastname: json.lastname || "",
        email: json.email || "",
        dob: json.dob || "",
        gender: json.gender || "",
      });
    } catch (err) {
      Alert.alert("Error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/auth/login");
    } catch (error) {
      Alert.alert("Logout failed");
    }
  };

  const updateField = (field: keyof typeof user, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <Text sx={{ p: 4 }}>Loading...</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#181818" }}>
      <View sx={{ px: 4, py: 5 }}>
        <Text sx={{ variant: "text.heading", mb: 4 }}>My Profile</Text>

        <Field label="First Name" value={user.name} onChange={(val) => updateField("name", val)} />
        <Field label="Last Name" value={user.lastname} onChange={(val) => updateField("lastname", val)} />
        <Field label="Email" value={user.email} editable={false} />
        <Field label="Date of Birth" value={user.dob} onChange={(val) => updateField("dob", val)} />
        <Field label="Gender" value={user.gender} onChange={(val) => updateField("gender", val)} />

        <Pressable
          sx={{
            bg: "error",
            borderRadius: "xl",
            py: 3,
            alignItems: "center",
            mt: 5,
          }}
          onPress={handleLogout}
        >
          <Text sx={{ color: "background", fontWeight: "bold" }}>Log Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const Field = ({
  label,
  value,
  onChange,
  editable = true,
}: {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  editable?: boolean;
}) => (
  <View sx={{ mb: 4 }}>
    <Text sx={{ color: "text", mb: 1 }}>{label}</Text>
    <RNTextInput
      style={{
        backgroundColor: "#222",
        color: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
      }}
      placeholderTextColor="#888"
      editable={editable}
      value={value}
      onChangeText={onChange}
    />
  </View>
);

export default ProfileScreen;
