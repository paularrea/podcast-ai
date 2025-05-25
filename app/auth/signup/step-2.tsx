import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput as RNTextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { View, Text } from "dripsy";
import { useSignupForm } from "./SignupFormContext";
import { FontAwesome } from "@expo/vector-icons";

export default function Step2() {
  const router = useRouter();
  const { data, setData } = useSignupForm();
  const [password, setPassword] = useState(data.password);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!data.email) router.replace("/auth/signup");
  }, []);

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSymbol = /[0-9\W]/.test(password);
  const hasMinLength = password.length >= 10;
  const isValid = hasLetter && hasNumberOrSymbol && hasMinLength;

  const handleNext = () => {
    setData({ ...data, password });
    router.push("/auth/signup/step-3");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 24 }}>
        <Text sx={{ color: "muted", fontSize: 14, mb: 8 }}>Step 1 of 3</Text>
        <View sx={{ height: 3, bg: "muted", borderRadius: 999, mb: 24 }}>
          <View sx={{ height: 3, width: "33%", bg: "primary", borderRadius: 999 }} />
        </View>

        <Text sx={{ fontSize: 24, fontWeight: "bold", color: "text", mb: 20 }}>
          Create a password
        </Text>

        <View sx={{ position: "relative", marginBottom: 16 }}>
          <RNTextInput
            placeholder="Enter a strong password"
            placeholderTextColor="#999"
            secureTextEntry={!show}
            value={password}
            onChangeText={setPassword}
            style={{
              backgroundColor: "#1E1E1E",
              color: "#fff",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 8,
              paddingRight: 44,
              fontSize: 16,
            }}
          />
          <TouchableOpacity
            onPress={() => setShow((prev) => !prev)}
            style={{ position: "absolute", right: 12, top: 12 }}
          >
            <FontAwesome name={show ? "eye-slash" : "eye"} size={18} color="#ccc" />
          </TouchableOpacity>
        </View>

        <Text sx={{ color: "text", fontWeight: "bold", mb: 8 }}>Your password must contain at least:</Text>
        <ChecklistItem checked={hasLetter} label="1 letter" />
        <ChecklistItem checked={hasNumberOrSymbol} label="1 number or special character" />
        <ChecklistItem checked={hasMinLength} label="10 characters" />

        <TouchableOpacity
          onPress={handleNext}
          disabled={!isValid}
          style={{
            backgroundColor: isValid ? "#9B59B6" : "#444",
            borderRadius: 999,
            paddingVertical: 12,
            alignItems: "center",
            marginTop: 32,
            opacity: isValid ? 1 : 0.6,
          }}
        >
          <Text sx={{ color: "background", fontWeight: "bold", fontSize: 16 }}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 24 }}>
          <Text sx={{ color: "primary", textAlign: "center" }}>← Go back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ChecklistItem({ checked, label }: { checked: boolean; label: string }) {
  return (
    <View sx={{ flexDirection: "row", alignItems: "center", mb: 3 }}>
      <Text sx={{ color: checked ? "primary" : "muted", fontSize: 16, width: 24 }}>
        {checked ? "✔︎" : "○"}
      </Text>
      <Text sx={{ color: "text", fontSize: 16 }}>{label}</Text>
    </View>
  );
}
