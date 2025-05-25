import React from "react";
import { SignupFormProvider } from "./SignupFormContext";
import { Stack } from "expo-router";

export default function SignupLayout() {
  return (
    <SignupFormProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SignupFormProvider>
  );
}
