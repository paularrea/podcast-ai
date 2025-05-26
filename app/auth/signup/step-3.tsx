import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "dripsy";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useSignupForm } from "./SignupFormContext";

const GENDERS = [
  "Man",
  "Woman",
  "Non-binary",
  "Something else",
  "Prefer not to say",
];
const years = Array.from({ length: 2025 - 1920 + 1 }, (_, i) => `${2025 - i}`);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
      <Text sx={{ color: "muted", fontSize: 16, mb: 1 }}>Step 2 of 3</Text>
      <View sx={{ height: 4, bg: "muted", borderRadius: 999, mb: 4 }}>
        <View
          sx={{ height: 4, width: "66%", bg: "primary", borderRadius: 999 }}
        />
      </View>

      <Text sx={{ variant: "text.heading", mb: 5 }}>
        Tell us about yourself
      </Text>

      <Text sx={{ color: "text", fontWeight: "bold", mb: 2 }}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        placeholderTextColor="#999"
        sx={{
          borderRadius: "md",
          px: 4,
          py: 3,
          color: "text",
          bg: "secondary",
          mb: 4,
        }}
      />

      <Text sx={{ color: "text", fontWeight: "bold", mb: 2 }}>
        Date of birth
      </Text>
      <View
        sx={{ flexDirection: "row", justifyContent: "space-between", mb: 6 }}
      >
        <Picker style={pickerStyle} selectedValue={day} onValueChange={setDay}>
          <Picker.Item label="dd" value="" />
          {days.map((d) => (
            <Picker.Item key={d} label={d} value={d} />
          ))}
        </Picker>
        <Picker
          style={pickerStyle}
          selectedValue={month}
          onValueChange={setMonth}
        >
          <Picker.Item label="Month" value="" />
          {months.map((m) => (
            <Picker.Item key={m} label={m} value={m} />
          ))}
        </Picker>
        <Picker
          style={pickerStyle}
          selectedValue={year}
          onValueChange={setYear}
        >
          <Picker.Item label="yyyy" value="" />
          {years.map((y) => (
            <Picker.Item key={y} label={y} value={y} />
          ))}
        </Picker>
      </View>

      <Text sx={{ color: "text", fontWeight: "bold", mb: 2 }}>Gender</Text>
      <View sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0, mb: 4 }}>
        {GENDERS.map((option) => (
          <Pressable
            key={option}
            onPress={() => setGender(option)}
            sx={{
              px: 12,
              py: 6,
              borderRadius: 999,
              flexDirection: "row",
              alignItems: "center",
              mr: 2,
              mb: 2,
            }}
          >
            <View
              sx={{
                width: 16,
                height: 16,
                borderRadius: 999,
                borderWidth: 2,
                borderColor: "text",
                justifyContent: "center",
                alignItems: "center",
                mr: 2,
              }}
            >
              {gender === option && (
                <View
                  sx={{ width: 6, height: 6, borderRadius: 999, bg: "text" }}
                />
              )}
            </View>
            <Text sx={{ color: "text", fontSize: 14 }}>{option}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={handleNext}
        disabled={!isValid}
        sx={{
          bg: isValid ? "primary" : "buttonDisabled",
          borderRadius: "xl",
          py: 3,
          alignItems: "center",
          mt: 4,
        }}
      >
        <Text sx={{ color: "background", fontWeight: "bold" }}>Next</Text>
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

const pickerStyle = {
  flex: 1,
  marginRight: 4,
  backgroundColor: "#1E1E1E",
  color: "#fff",
  borderRadius: 8,
  height: 48,
  borderWidth: 0,
};
