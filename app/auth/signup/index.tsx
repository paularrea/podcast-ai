import React from "react";
import { View, Text, Pressable, TextInput } from "dripsy";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useSignupForm } from "./SignupFormContext";

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
  } = useForm({ resolver: zodResolver(schema), defaultValues: { email: data.email } });

  const onSubmit = (values) => {
    setData({ ...data, email: values.email });
    router.push("/auth/signup/step-2");
  };

  return (
    <View sx={{ flex: 1, bg: "background", px: 6, justifyContent: "center" }}>
      <Text sx={{ variant: "text.heading", mb: 5 }}>Sign up to start creating</Text>

      <Text sx={{ variant: "text.body", fontWeight: "bold", mb: 2 }}>Email address</Text>
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        value={watch("email")}
        onChangeText={(text) => setValue("email", text)}
        placeholder="you@example.com"
        placeholderTextColor="#888"
        sx={{
          borderWidth: 1,
          borderColor: "muted",
          borderRadius: "md",
          px: 4,
          py: 3,
          color: "text",
          bg: "secondary",
          fontSize: 16,
        }}
      />
      {errors.email && <Text sx={{ color: "error", mt: 2 }}>{errors.email.message}</Text>}

      <Pressable onPress={handleSubmit(onSubmit)} sx={{ bg: "primary", py: 4, borderRadius: "xl", alignItems: "center", my: 5 }}>
        <Text sx={{ color: "background", fontWeight: "bold" }}>Next</Text>
      </Pressable>

      <View sx={{ flexDirection: "row", alignItems: "center", mb: 5 }}>
        <View sx={{ flex: 1, height: 1, bg: "muted" }} />
        <Text sx={{ color: "muted", mx: 3 }}>or</Text>
        <View sx={{ flex: 1, height: 1, bg: "muted" }} />
      </View>

      <Pressable sx={socialBtn}><Text sx={socialText}>Sign up with Google</Text></Pressable>
      <Pressable disabled sx={socialBtn}><Text sx={[socialText, { color: "muted" }]}>Sign up with Facebook</Text></Pressable>
      <Pressable disabled sx={socialBtn}><Text sx={[socialText, { color: "muted" }]}>Sign up with Apple</Text></Pressable>

      <Text sx={{ color: "text", mt: 8, textAlign: "center" }}>
        Already have an account?{" "}
        <Text onPress={() => router.push("/auth/login")} sx={{ color: "primary", fontWeight: "bold" }}>
          Log in here
        </Text>
      </Text>
    </View>
  );
}

const socialBtn = {
  bg: "secondary",
  borderWidth: 1,
  borderColor: "muted",
  borderRadius: "xl",
  py: 4,
  px: 4,
  mb: 3,
  alignItems: "center",
};

const socialText = {
  color: "text",
  fontWeight: "bold",
};
