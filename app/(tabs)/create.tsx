import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useDiary, type Mood } from "../../src/context/DiaryContext";
import { Colors, Radius, Spacing } from "../../src/styles/tokens";

const MOODS: Mood[] = ["Happy", "Calm", "Sad", "Excited", "Grateful"];

export default function CreateScreen() {
  const { addEntry } = useDiary();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  );
  const [body, setBody] = useState("");
  const [mood, setMood] = useState<Mood>("Happy");

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Title Required", "Please enter your diary title.");
      return;
    }

    if (!date.trim()) {
      Alert.alert("Date Required", "Please enter the diary date.");
      return;
    }

    if (!body.trim()) {
      Alert.alert("Story Required", "Please write your diary first.");
      return;
    }

    addEntry({
      title: title.trim(),
      date: date.trim(),
      body: body.trim(),
      mood,
    });

    Alert.alert("Diary Saved!", "Your memory has been successfully saved.", [
      {
        text: "OK",
        onPress: () => {
          setTitle("");
          setBody("");
          setMood("Happy");
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.greeting}>SAVE YOUR MOMENTS</Text>
          <Text style={styles.title}>Create Diary</Text>
          <Text style={styles.subtitle}>Write your thoughts and memories.</Text>
        </View>

        {/* DECORATION */}
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>✦</Text>
          <Text style={styles.bannerTitle}>Every memory matters.</Text>
          <Text style={styles.bannerSubtitle}>
            Take a moment to capture your day.
          </Text>
        </View>

        {/* TITLE INPUT */}
        <View style={styles.section}>
          <Text style={styles.label}>Diary Title</Text>

          <TextInput
            style={styles.input}
            placeholder="Give your memory a title..."
            placeholderTextColor={Colors.textSecondary}
            value={title}
            onChangeText={setTitle}
            maxLength={80}
          />
        </View>

        {/* DATE INPUT */}
        <View style={styles.section}>
          <Text style={styles.label}>Date</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: 10 November 2026"
            placeholderTextColor={Colors.textSecondary}
            value={date}
            onChangeText={setDate}
          />
        </View>

        {/* MOOD SELECTOR */}
        <View style={styles.section}>
          <Text style={styles.label}>How are you feeling?</Text>

          <View style={styles.moodContainer}>
            {MOODS.map((item) => {
              const selected = mood === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => setMood(item)}
                  style={[styles.moodChip, selected && styles.moodChipActive]}
                >
                  <Text
                    style={[styles.moodText, selected && styles.moodTextActive]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* STORY INPUT */}
        <View style={styles.section}>
          <Text style={styles.label}>Your Story</Text>

          <TextInput
            style={styles.bodyInput}
            placeholder="Write about your day, your feelings, or something special that happened..."
            placeholderTextColor={Colors.textSecondary}
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
            maxLength={5000}
          />

          <Text style={styles.characterCount}>
            {body.length}/5000 characters
          </Text>
        </View>

        {/* SAVE BUTTON */}
        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>♥ Save My Diary</Text>
        </Pressable>

        <Text style={styles.footer}>Your memories are worth keeping.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingTop: 55,
    paddingBottom: 45,
  },

  header: {
    marginBottom: 25,
  },

  greeting: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 7,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 7,
  },

  banner: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: 22,
    marginBottom: 27,
  },

  bannerEmoji: {
    color: "#DCD6FF",
    fontSize: 28,
  },

  bannerTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  bannerSubtitle: {
    color: "#E4E0FF",
    fontSize: 12,
    marginTop: 7,
  },

  section: {
    marginBottom: 23,
  },

  label: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 11,
  },

  input: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: Colors.text,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E8E5F0",
  },

  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  moodChip: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: "#E8E5F0",
  },

  moodChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  moodText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },

  moodTextActive: {
    color: Colors.white,
  },

  bodyInput: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: "#E8E5F0",
    padding: 16,
    minHeight: 180,
    color: Colors.text,
    fontSize: 14,
    lineHeight: 23,
  },

  characterCount: {
    textAlign: "right",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 8,
  },

  saveButton: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: Radius.lg,
    alignItems: "center",
    marginTop: 5,
  },

  saveButtonPressed: {
    opacity: 0.8,
  },

  saveButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },

  footer: {
    color: Colors.textSecondary,
    textAlign: "center",
    fontSize: 11,
    marginTop: 22,
  },
});
