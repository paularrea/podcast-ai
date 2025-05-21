import { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter } from 'expo-router';
import { useApi } from '../hooks/useApi';
import { createPodcast } from '../../services/podcastService';
import { addPodcastToLibrary } from '../../services/libraryService';
import type { PodcastEntry } from '../../types/PodcastEntry';

const minuteOptions = ['1', '3', '5'];
const narrativeOptions = ['Storytelling', 'Interview', 'News', 'Education'];

export default function CreatePodcastModal() {
  const router = useRouter();
  const { post } = useApi();

  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState('3');
  const [narrativeType, setNarrativeType] = useState('Storytelling');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const [steps, setSteps] = useState([
    { label: 'Sending prompt to OpenAI', done: false },
    { label: 'Receiving script from OpenAI', done: false },
    { label: 'Sending script to ElevenLabs', done: false },
    { label: 'Generating podcast', done: false },
    { label: 'Retrieving podcast', done: false },
    { label: 'Uploading to Firebase', done: false },
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
    Alert.alert('Missing fields', 'Please fill all fields before continuing.');
    return;
  }

  try {
    setCreating(true);
    setSteps((prev) => prev.map((step) => ({ ...step, done: false })));

    const base64Audio = await createPodcast(
      title,
      minutes,
      narrativeType,
      description,
      updateStep
    );

    updateStep(5, false);

    const durationInSeconds = parseInt(minutes, 10) * 60;

    const saved = await post('/api/podcasts', {
      title,
      base64Audio,
      duration: durationInSeconds,
    });

    updateStep(5, true);

    const entry: PodcastEntry = {
      title,
      fileUri: saved.fileUri,
      createdAt: saved.createdAt,
      minutes,
    };

    addPodcastToLibrary(entry);
    Alert.alert('✅ Success', 'Podcast created successfully!');
    router.replace('/(tabs)/library');
  } catch (err) {
    console.error('❌ Error creating podcast:', err);
    Alert.alert('Error', 'Failed to create podcast. Please try again.');
  } finally {
    setCreating(false);
  }
};


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Create New Podcast</Text>

      <Text style={{ marginBottom: 5 }}>Podcast Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 8 }}
        placeholder="Enter podcast title"
        placeholderTextColor="gray"
      />

      <Text style={{ marginBottom: 5 }}>Minutes</Text>
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        {minuteOptions.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => setMinutes(opt)}
            style={{
              backgroundColor: minutes === opt ? '#007AFF' : '#eee',
              padding: 10,
              marginRight: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: minutes === opt ? 'white' : 'black' }}>{opt} min</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ marginBottom: 5 }}>Narrative Type</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 }}>
        {narrativeOptions.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => setNarrativeType(opt)}
            style={{
              backgroundColor: narrativeType === opt ? '#007AFF' : '#eee',
              padding: 10,
              margin: 5,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: narrativeType === opt ? 'white' : 'black' }}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ marginBottom: 5 }}>What's the podcast about?</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={{ borderWidth: 1, marginBottom: 20, padding: 10, borderRadius: 8, minHeight: 100 }}
        placeholder="Enter a short description"
        placeholderTextColor="gray"
      />

      <Button
        title={creating ? 'Creating Podcast...' : 'Create Podcast'}
        onPress={handleCreatePodcast}
        disabled={creating}
      />

      {creating && (
        <View style={{ marginTop: 20 }}>
          {steps.map((step, index) => (
            <Text key={index} style={{ marginBottom: 5 }}>
              {step.done ? '✅' : '⬜️'} {step.label}
            </Text>
          ))}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}
