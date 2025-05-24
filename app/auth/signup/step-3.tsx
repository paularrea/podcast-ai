import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "dripsy";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useSignupForm } from "./SignupFormContext";

const GENDERS = ["Man", "Woman", "Non-binary", "Something else", "Prefer not to say"];
const years = Array.from({ length: 2025 - 1920 + 1 }, (_, i) => `${2025 - i}`);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

export default function Step3() {
  const router = useRouter();
  const { data, setData } = useSignupForm();
  const [name, setName] = useState(data.name);
  const [day, setDay] = useState(data.dob.day);
  const [month, setMonth] = useState(data.dob.month);
  const [year, setYear] = useState(data.dob.year);
  const [gender, setGender] = useState(data.gender);

  const isValid = name && day && month && year && gender;

  useEffect(() => {
  if (!data.email || !data.password) {
    router.replace("/auth/signup");
  }
}, []);


  const handleNext = () => {
    setData({ ...data, name, dob: { day, month, year }, gender });
    router.push("/auth/signup/step-4");
  };

  return (
    <View sx={{ flex: 1, px: 6, bg: "background", justifyContent: "center" }}>
      <Text sx={{ variant: "text.heading", mb: 5 }}>Tell us about yourself</Text>

      <Text sx={{ color: "text", fontWeight: "bold", mb: 2 }}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        placeholderTextColor="#888"
        sx={{
          borderWidth: 1,
          borderColor: "muted",
          borderRadius: "md",
          px: 4,
          py: 3,
          color: "text",
          bg: "secondary",
          mb: 4,
        }}
      />

      <Text sx={{ color: "text", fontWeight: "bold", mb: 2 }}>Date of Birth</Text>
      <View sx={{ flexDirection: "row", gap: 2, mb: 4 }}>
        <Picker style={{ flex: 1 }} selectedValue={day} onValueChange={setDay}>
          <Picker.Item label="Day" value="" />
          {days.map((d) => <Picker.Item key={d} label={d} value={d} />)}
        </Picker>
        <Picker style={{ flex: 1 }} selectedValue={month} onValueChange={setMonth}>
          <Picker.Item label="Month" value="" />
          {months.map((m) => <Picker.Item key={m} label={m} value={m} />)}
        </Picker>
        <Picker style={{ flex: 1 }} selectedValue={year} onValueChange={setYear}>
          <Picker.Item label="Year" value="" />
          {years.map((y) => <Picker.Item key={y} label={y} value={y} />)}
        </Picker>
      </View>

      <Text sx={{ color: "text", fontWeight: "bold", mb: 2 }}>Gender</Text>
      {GENDERS.map((option) => (
        <Pressable
          key={option}
          onPress={() => setGender(option)}
          sx={{
            p: 12,
            borderWidth: 1,
            borderColor: gender === option ? "primary" : "muted",
            bg: gender === option ? "secondary" : "background",
            borderRadius: "md",
            mb: 3,
          }}
        >
          <Text sx={{ color: "text" }}>{option}</Text>
        </Pressable>
      ))}

      <Pressable onPress={handleNext} disabled={!isValid} sx={{ bg: "primary", py: 4, borderRadius: "xl", alignItems: "center", mt: 4, opacity: isValid ? 1 : 0.5 }}>
        <Text sx={{ color: "background", fontWeight: "bold" }}>Next</Text>
      </Pressable>

      <Text onPress={() => router.back()} sx={{ color: "primary", textAlign: "center", mt: 4 }}>
        ← Go back
      </Text>
    </View>
  );
}
