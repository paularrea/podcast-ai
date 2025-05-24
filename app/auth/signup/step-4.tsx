import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ActivityIndicator } from "dripsy";
import { useRouter } from "expo-router";
import { useSignupForm } from "./SignupFormContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function Step4() {
  const router = useRouter();
  const { data, setData } = useSignupForm();
  const [loading, setLoading] = useState(false);
  const [optInNews, setOptInNews] = useState(data.optInNews);
  const [optInMarketing, setOptInMarketing] = useState(data.optInMarketing);

  // ✅ Defensive: prevent corrupted state
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
      <Text sx={{ variant: "text.heading", mb: 5 }}>Terms & Conditions</Text>

      <Text onPress={() => setOptInNews(!optInNews)} sx={checkbox}>
        <Text sx={{ fontWeight: "bold", color: "text" }}>{optInNews ? "✅" : "⬜"} </Text>
        Please send me news and offers from PodcastAI
      </Text>

      <Text onPress={() => setOptInMarketing(!optInMarketing)} sx={checkbox}>
        <Text sx={{ fontWeight: "bold", color: "text" }}>{optInMarketing ? "✅" : "⬜"} </Text>
        Share my registration data with PodcastAI's content providers...
      </Text>

      <Text sx={{ fontSize: 12, color: "muted", mt: 4 }}>
        By clicking on sign-up, you agree to PodcastAI’s Terms and Conditions of Use.
        See our Privacy Policy for more.
      </Text>

      <Pressable onPress={handleSignup} disabled={loading} sx={{
        bg: "primary", py: 4, borderRadius: "xl", alignItems: "center", mt: 5
      }}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text sx={{ color: "background", fontWeight: "bold" }}>Sign up</Text>}
      </Pressable>

      <Text onPress={() => router.back()} sx={{ color: "primary", textAlign: "center", mt: 4 }}>
        ← Go back
      </Text>
    </View>
  );
}

const checkbox = {
  color: "text",
  fontSize: 14,
  mb: 4,
};
