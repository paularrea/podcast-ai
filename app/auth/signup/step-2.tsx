import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "dripsy";
import { useRouter } from "expo-router";
import { useSignupForm } from "./SignupFormContext";

export default function Step2() {
  const router = useRouter();
  const { data, setData } = useSignupForm();
  const [password, setPassword] = useState(data.password);
  const [show, setShow] = useState(false);

  // 🔐 Guard against direct navigation
  useEffect(() => {
    if (!data.email) router.replace("/auth/signup");
  }, []);

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSymbol = /[0-9\\W]/.test(password);
  const hasMinLength = password.length >= 10;
  const isValid = hasLetter && hasNumberOrSymbol && hasMinLength;

  const handleNext = () => {
    setData({ ...data, password });
    router.push("/auth/signup/step-3");
  };

  return (
    <View sx={{ flex: 1, px: 6, bg: "background", justifyContent: "center" }}>
      <Text sx={{ variant: "text.heading", mb: 5 }}>Create a password</Text>
      <TextInput
        secureTextEntry={!show}
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••••"
        placeholderTextColor="#888"
        sx={{
          borderWidth: 1,
          borderColor: "muted",
          borderRadius: "md",
          px: 4,
          py: 3,
          color: "text",
          bg: "secondary",
        }}
      />
      <Text onPress={() => setShow(!show)} sx={{ color: "primary", mt: 2 }}>
        {show ? "Hide" : "Show"} Password
      </Text>

      <Text sx={{ mt: 4, mb: 1, color: "text" }}>Your password must contain at least:</Text>
      <Text sx={{ color: hasLetter ? "primary" : "error" }}>• 1 letter</Text>
      <Text sx={{ color: hasNumberOrSymbol ? "primary" : "error" }}>• 1 number or special character</Text>
      <Text sx={{ color: hasMinLength ? "primary" : "error" }}>• 10 characters</Text>

      <Pressable onPress={handleNext} disabled={!isValid} sx={{
        bg: "primary", py: 4, borderRadius: "xl", alignItems: "center", mt: 5, opacity: isValid ? 1 : 0.5
      }}>
        <Text sx={{ color: "background", fontWeight: "bold" }}>Next</Text>
      </Pressable>

      <Text onPress={() => router.back()} sx={{ color: "primary", textAlign: "center", mt: 4 }}>
        ← Go back
      </Text>
    </View>
  );
}
