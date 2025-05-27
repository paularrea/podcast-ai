import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { useDripsyTheme } from "dripsy";
import { useApi } from "../hooks/useApi";
import { addPodcastToLibrary } from "../../services/libraryService";
import type { PodcastEntry } from "../../types/PodcastEntry";
import { X } from "lucide-react-native";

const minuteOptions = ["1", "3", "5"];
const narrativeOptions = ["Storytelling", "Interview", "News", "Education"];

export default function CreatePodcastModal() {
  const router = useRouter();
  const { post } = useApi();
  const { theme } = useDripsyTheme();
  const colors = theme.colors;
  const radii = theme.radii;

  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("3");
  const [narrativeType, setNarrativeType] = useState("Storytelling");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const [steps, setSteps] = useState([
    { label: "Sending request to server", done: false },
    { label: "Generating script", done: false },
    { label: "Synthesizing audio", done: false },
    { label: "Uploading to Firebase", done: false },
    { label: "Saving podcast", done: false },
  ]);

  const updateStep = (index: number, done: boolean) => {
    setSteps((prev) => {
      const updated = [...prev];
      if (updated[index]) updated[index].done = done;
      return updated;
    });
  };

  const handleCreatePodcast = async () => {
    if (!title || !description) {
      Alert.alert("Missing fields", "Please fill all fields before continuing.");
      return;
    }

    try {
      setCreating(true);
      setSteps((prev) => prev.map((step) => ({ ...step, done: false })));

      updateStep(0, true);

      const res = await post("/api/podcasts", {
        title,
        minutes,
        narrativeType,
        description,
      });

      updateStep(1, true);
      updateStep(2, true);
      updateStep(3, true);
      updateStep(4, true);

      const entry: PodcastEntry = {
        title: res.title,
        fileUri: res.fileUri,
        createdAt: res.createdAt,
        minutes,
      };

      addPodcastToLibrary(entry);
      Alert.alert("✅ Success", "Podcast created successfully!");
      router.replace("/(tabs)/library");
    } catch (err) {
      console.error("❌ Error creating podcast:", err);
      Alert.alert("Error", "Failed to create podcast. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 24,
        backgroundColor: colors.secondary,
      }}
    >
      {/* ❌ Close Button */}
      <Pressable
        onPress={() => router.back()}
        style={{ position: "absolute", top: 24, right: 24, zIndex: 10 }}
      >
        <X color={colors.text} size={28} />
      </Pressable>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: colors.text,
          marginBottom: 16,
          textAlign: "left",
          marginTop: 48,
        }}
      >
        Create New Podcast
      </Text>

      <Text style={{ color: colors.text, marginBottom: 4 }}>Podcast Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        placeholderTextColor={colors.placeholder}
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <Text style={{ color: colors.text, marginBottom: 4 }}>Minutes</Text>
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        {minuteOptions.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => setMinutes(opt)}
            style={{
              backgroundColor:
                minutes === opt ? colors.primary : colors.background,
              padding: 10,
              marginRight: 10,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: minutes === opt ? colors.background : colors.text,
              }}
            >
              {opt} min
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ color: colors.text, marginBottom: 4 }}>
        Narrative Type
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12 }}>
        {narrativeOptions.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => setNarrativeType(opt)}
            style={{
              backgroundColor:
                narrativeType === opt ? colors.primary : colors.background,
              padding: 10,
              margin: 4,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color:
                  narrativeType === opt ? colors.background : colors.text,
              }}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ color: colors.text, marginBottom: 4 }}>
        What's the podcast about?
      </Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter a short description"
        placeholderTextColor={colors.placeholder}
        multiline
        numberOfLines={4}
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          padding: 12,
          borderRadius: 8,
          minHeight: 100,
          marginBottom: 16,
        }}
      />

      <Pressable
        onPress={handleCreatePodcast}
        disabled={creating}
        style={{
          backgroundColor: creating ? colors.buttonDisabled : colors.primary,
          padding: 14,
          borderRadius: radii.xl,
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.background, fontWeight: "bold" }}>
          {creating ? "Creating Podcast..." : "Create Podcast"}
        </Text>
      </Pressable>

      {creating && (
        <View style={{ marginTop: 20 }}>
          {steps.map((step, index) => (
            <Text key={index} style={{ color: colors.text, marginBottom: 6 }}>
              {step.done ? "✅" : "⬜️"} {step.label}
            </Text>
          ))}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}
