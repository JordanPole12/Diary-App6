import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useDiary } from "../../src/context/DiaryContext";
import { Colors, Radius, Spacing } from "../../src/styles/tokens";

export default function DiaryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { getById, likedIds, toggleLike } = useDiary();

  const entry = getById(id);

  if (!entry) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundIcon}>📖</Text>
        <Text style={styles.notFoundTitle}>Diary not found</Text>
        <Text style={styles.notFoundText}>
          This diary may have been deleted.
        </Text>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const isLiked = likedIds.has(entry.id);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.topBar}>
        <Pressable style={styles.backCircle} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

        <Text style={styles.topTitle}>Diary Detail</Text>

        <Pressable
          style={styles.likeCircle}
          onPress={() => toggleLike(entry.id)}
        >
          <Text style={styles.heart}>{isLiked ? "♥" : "♡"}</Text>
        </Pressable>
      </View>

      {/* MOOD */}
      <View style={styles.moodBadge}>
        <Text style={styles.moodText}>{entry.mood}</Text>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>{entry.title}</Text>

      {/* DATE */}
      <Text style={styles.date}>{entry.date}</Text>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* CONTENT */}
      <View style={styles.diaryContent}>
        <Text style={styles.contentLabel}>YOUR STORY</Text>
        <Text style={styles.body}>{entry.body}</Text>
      </View>

      {/* FAVORITE BUTTON */}
      <Pressable
        style={[styles.favoriteButton, isLiked && styles.favoriteButtonActive]}
        onPress={() => toggleLike(entry.id)}
      >
        <Text
          style={[
            styles.favoriteButtonText,
            isLiked && styles.favoriteButtonTextActive,
          ]}
        >
          {isLiked ? "♥  Remove from Favorites" : "♡  Add to Favorites"}
        </Text>
      </Pressable>

      <Text style={styles.footer}>Every moment is worth remembering.</Text>
    </ScrollView>
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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  backCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 32,
    color: Colors.text,
    marginTop: -4,
  },
  topTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  likeCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  heart: {
    fontSize: 24,
    color: Colors.danger,
  },
  moodBadge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: Radius.full,
    marginBottom: 18,
  },
  moodText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 12,
  },
  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 38,
  },
  date: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E8E5F0",
    marginVertical: 25,
  },
  diaryContent: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: 22,
  },
  contentLabel: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 18,
  },
  body: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 28,
  },
  favoriteButton: {
    marginTop: 25,
    backgroundColor: Colors.surface,
    padding: 17,
    borderRadius: Radius.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  favoriteButtonActive: {
    backgroundColor: Colors.primary,
  },
  favoriteButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  favoriteButtonTextActive: {
    color: Colors.white,
  },
  footer: {
    color: Colors.textSecondary,
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
  },
  notFound: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  notFoundIcon: {
    fontSize: 55,
  },
  notFoundTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
  },
  notFoundText: {
    color: Colors.textSecondary,
    marginTop: 8,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: Radius.lg,
    marginTop: 22,
  },
  backButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});
