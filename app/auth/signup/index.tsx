import React from "react";
import {
  SafeAreaView,
  TextInput as RNTextInput,

  ScrollView,
} from "react-native";
import { Text, View, Pressable } from "dripsy";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useSignupForm } from "./SignupFormContext";
import { FontAwesome } from "@expo/vector-icons";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function Step1() {
  const router = useRouter();
  const { data, setData } = useSignupForm();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: data.email },
  });

    const onSubmit = (values) => {
    setData({ ...data, email: values.email });
    router.push("/auth/signup/step-2");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 24 }}>
        <Text sx={{ fontSize: 24, fontWeight: "bold", color: "text", mb: 24, textAlign: "center" }}>
          Sign up to start creating
        </Text>

        <SocialButton icon="google" label="Sign up with Google" onPress={() => {}} />
        <SocialButton icon="facebook" label="Sign up with Facebook" disabled />
        <SocialButton icon="apple" label="Sign up with Apple" disabled />

        <View sx={{ height: 1, bg: "muted", my: 24 }} />

        <Text sx={{ color: "text", fontWeight: "bold", mb: 4 }}>Email address</Text>
        <RNTextInput
          autoCapitalize="none"
          keyboardType="email-address"
          value={watch("email")}
          onChangeText={(text) => setValue("email", text)}
          placeholder="you@example.com"
          placeholderTextColor="#999"
          style={{
            backgroundColor: "#1E1E1E",
            color: "#fff",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            fontSize: 16,
            marginBottom: 12,
          }}
        />
        {errors.email && <Text sx={{ color: "error", mt: 2 }}>{errors.email.message}</Text>}

                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  sx={{
                    bg: "primary",
                    borderRadius: "xl",
                    py: 3,
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <Text sx={{ color: "background", fontWeight: "bold" }}>Sign Up</Text>
                </Pressable>

        <Pressable style={{ marginTop: 24 }} onPress={() => router.push("/auth/login")}>
          <Text sx={{ color: "text", textAlign: "center" }}>
            Already have an account? <Text sx={{ textDecorationLine: "underline" }}>Log in here</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function SocialButton({ icon, label, disabled, onPress }: any) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <FontAwesome name={icon} size={18} color="white" style={{ marginRight: 8 }} />
      <Text sx={{ color: "white", fontWeight: "500" }}>{label}</Text>
    </Pressable>
  );
}
