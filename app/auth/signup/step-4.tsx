import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ActivityIndicator } from "dripsy";
import { useRouter } from "expo-router";
import { useSignupForm } from "./SignupFormContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { Ionicons } from "@expo/vector-icons";

export default function Step4() {
  const router = useRouter();
  const { data, setData } = useSignupForm();
  const [loading, setLoading] = useState(false);
  const [optInNews, setOptInNews] = useState(data.optInNews);
  const [optInMarketing, setOptInMarketing] = useState(data.optInMarketing);

  useEffect(() => {
    if (!data.email || !data.password) {
      router.replace("/auth/signup");
    }
  }, []);

  const handleSignup = async () => {
    if (!data.email || !data.password) {
      alert("Email or password is missing.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setData({ ...data, optInNews, optInMarketing });
      router.replace("/");
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View sx={{ flex: 1, px: 6, bg: "background", justifyContent: "center" }}>
      <Text sx={{ color: "muted", fontSize: 16, mb: 1 }}>Step 3 of 3</Text>
      <View
        sx={{
          height: 4,
          width: "100%",
          bg: "muted",
          borderRadius: 9999,
          mb: 6,
        }}
      >
        <View
          sx={{ height: 4, width: "100%", bg: "primary", borderRadius: 9999 }}
        />
      </View>

      <Text sx={{ variant: "text.heading", mb: 5 }}>Terms & Conditions</Text>

      <CheckboxRow
        label="Please send me news and offers from PodcastAI"
        value={optInNews}
        onValueChange={setOptInNews}
      />

      <CheckboxRow
        label="Share my registration data with PodcastAI's content providers..."
        value={optInMarketing}
        onValueChange={setOptInMarketing}
      />

      <Text sx={{ fontSize: 12, color: "muted", mt: 4 }}>
        By clicking on sign-up, you agree to PodcastAI’s Terms and Conditions of
        Use. See our Privacy Policy for more.
      </Text>

      <Pressable
        onPress={handleSignup}
        disabled={loading}
        sx={{
          bg: "primary",
          borderRadius: "xl",
          py: 3,
          alignItems: "center",
          mt: 4,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text sx={{ color: "background", fontWeight: "bold" }}>Sign up</Text>
        )}
      </Pressable>

      <Text
        onPress={() => router.back()}
        sx={{ color: "primary", textAlign: "center", mt: 4 }}
      >
        ← Go back
      </Text>
    </View>
  );
}

function CheckboxRow({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) {
  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        mb: 3,
      }}
    >
      <View
        sx={{
          width: 20,
          height: 20,
          borderWidth: 2,
          borderColor: "primary",
          bg: value ? "primary" : "background",
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
          mr: 12,
        }}
      >
        {value && <Ionicons name="checkmark" size={14} color="black" />}
      </View>
      <Text sx={{ color: "text", fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}
