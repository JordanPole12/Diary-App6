import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useDiary } from "../../src/context/DiaryContext";
import { useLikedEntries } from "../../src/hooks/useLikedEntries";
import { Colors, Radius, Spacing } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const { entries, likedIds, toggleLike, compactMode } = useDiary();

  const favoriteEntries = useLikedEntries(entries, likedIds);

  const openDetail = (id: string) => {
    router.push({
      pathname: "/detail/[id]",
      params: { id },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>YOUR SPECIAL COLLECTION</Text>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>
          All your most meaningful memories in one place.
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryIcon}>♥</Text>
        <View style={styles.summaryInfo}>
          <Text style={styles.summaryNumber}>{favoriteEntries.length}</Text>
          <Text style={styles.summaryLabel}>Saved favorite memories</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Favorites</Text>
        <Text style={styles.count}>{favoriteEntries.length} entries</Text>
      </View>

      {favoriteEntries.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyDescription}>
            Tap the heart icon on a diary to add it to your favorite collection.
          </Text>

          <Pressable
            style={styles.homeButton}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.homeButtonText}>Explore My Diary</Text>
          </Pressable>
        </View>
      ) : (
        favoriteEntries.map((entry) => (
          <View
            key={entry.id}
            style={[styles.diaryCard, compactMode && styles.diaryCardCompact]}
          >
            <View style={styles.diaryTop}>
              <Text style={styles.mood}>{entry.mood}</Text>

              <Pressable onPress={() => toggleLike(entry.id)} hitSlop={10}>
                <Text style={styles.heart}>♥</Text>
              </Pressable>
            </View>

            <Pressable onPress={() => openDetail(entry.id)}>
              <Text
                style={[
                  styles.diaryTitle,
                  compactMode && styles.diaryTitleCompact,
                ]}
              >
                {entry.title}
              </Text>

              <Text style={styles.diaryDate}>{entry.date}</Text>

              <Text style={styles.diaryBody} numberOfLines={3}>
                {entry.body}
              </Text>

              <Text style={styles.readMore}>Read diary →</Text>
            </Pressable>
          </View>
        ))
      )}
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
    paddingBottom: 40,
  },

  header: {
    marginBottom: 25,
  },

  eyebrow: {
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
    fontSize: 12,
    marginTop: 7,
    lineHeight: 19,
  },

  summaryCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  summaryIcon: {
    color: Colors.white,
    fontSize: 38,
    marginRight: 17,
  },

  summaryInfo: {
    flex: 1,
  },

  summaryNumber: {
    color: Colors.white,
    fontSize: 27,
    fontWeight: "bold",
  },

  summaryLabel: {
    color: "#E4E0FF",
    fontSize: 11,
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },

  count: {
    color: Colors.textSecondary,
    fontSize: 11,
  },

  diaryCard: {
    backgroundColor: Colors.surface,
    padding: 18,
    borderRadius: Radius.lg,
    marginBottom: 13,
  },

  diaryCardCompact: {
    padding: 11,
    marginBottom: 7,
  },

  diaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mood: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: "bold",
  },

  heart: {
    color: Colors.danger,
    fontSize: 25,
  },

  diaryTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
  },

  diaryTitleCompact: {
    fontSize: 15,
    marginTop: 6,
  },

  diaryDate: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 5,
  },

  diaryBody: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },

  readMore: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 13,
  },

  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: 28,
    alignItems: "center",
  },

  emptyIcon: {
    color: Colors.primary,
    fontSize: 55,
    marginBottom: 12,
  },

  emptyTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },

  emptyDescription: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 9,
  },

  homeButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 20,
  },

  homeButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});
