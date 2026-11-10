import { router } from "expo-router";
import { useCallback, useRef, type ComponentRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useDiary } from "../../src/context/DiaryContext";
import { useDiarySearch } from "../../src/hooks/useDiarySearch";
import { Colors, Radius, Spacing } from "../../src/styles/tokens";

export default function HomeScreen() {
  // Mengambil data dan fungsi dari DiaryContext
  const { entries, likedIds, toggleLike, compactMode } = useDiary();

  // Custom hook untuk pencarian dan filter Mood
  const { query, setQuery, mood, setMood, filteredEntries, resetFilters } =
    useDiarySearch(entries);

  // useRef: menyimpan referensi TextInput
  const searchInputRef = useRef<ComponentRef<typeof TextInput>>(null);

  // useCallback: fungsi membuka halaman detail
  const openDetail = useCallback((id: string) => {
    router.push({
      pathname: "/detail/[id]",
      params: { id },
    });
  }, []);

  // useCallback: memfokuskan kolom pencarian
  const focusSearch = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  // Daftar Mood yang tersedia
  const moods = [
    "All",
    ...Array.from(new Set(entries.map((entry) => entry.mood).filter(Boolean))),
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>YOUR PERSONAL SPACE</Text>
          <Text style={styles.title}>My Diary</Text>
          <Text style={styles.subtitle}>
            Capture your moments, keep your memories.
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>D</Text>
        </View>
      </View>

      {/* BANNER */}
      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>A LITTLE REMINDER</Text>

        <Text style={styles.bannerTitle}>
          Every day has a story worth remembering.
        </Text>

        <Text style={styles.bannerEmoji}>✦</Text>
      </View>

      {/* STATISTICS */}
      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{entries.length}</Text>
          <Text style={styles.statLabel}>Total Diaries</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{likedIds.size}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

      {/* SECTION HEADER */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Memories</Text>
        <Text style={styles.count}>{filteredEntries.length} entries</Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Pressable onPress={focusSearch} hitSlop={10}>
          <Text style={styles.searchIcon}>⌕</Text>
        </Pressable>

        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search your diary..."
          placeholderTextColor={Colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          clearButtonMode="never"
        />

        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")} hitSlop={10}>
            <Text style={styles.clearText}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* MOOD FILTER */}
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Filter by Mood</Text>

        <Pressable onPress={resetFilters} hitSlop={10}>
          <Text style={styles.resetText}>Reset Filter</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.moodScroll}
        contentContainerStyle={styles.moodContainer}
      >
        {moods.map((item) => {
          const selected = mood === item;

          return (
            <Pressable
              key={item}
              onPress={() => setMood(item)}
              style={[styles.moodChip, selected && styles.moodChipActive]}
            >
              <Text
                style={[
                  styles.moodChipText,
                  selected && styles.moodChipTextActive,
                ]}
              >
                {item === "All" ? "All Moods" : item}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* DIARY LIST */}
      {filteredEntries.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>📖</Text>

          <Text style={styles.emptyTitle}>
            {entries.length === 0 ? "Your story starts here" : "No diary found"}
          </Text>

          <Text style={styles.emptyDescription}>
            {entries.length === 0
              ? "Create your first diary and save your special moments."
              : "Try another keyword or mood filter."}
          </Text>

          {entries.length > 0 && (
            <Pressable style={styles.emptyReset} onPress={resetFilters}>
              <Text style={styles.emptyResetText}>Reset Filter</Text>
            </Pressable>
          )}
        </View>
      ) : (
        filteredEntries.map((entry) => (
          <View
            key={entry.id}
            style={[styles.diaryCard, compactMode && styles.diaryCardCompact]}
          >
            {/* MOOD AND FAVORITE */}
            <View style={styles.diaryTop}>
              <Text style={styles.mood}>{entry.mood}</Text>

              <Pressable onPress={() => toggleLike(entry.id)} hitSlop={10}>
                <Text style={styles.heart}>
                  {likedIds.has(entry.id) ? "♥" : "♡"}
                </Text>
              </Pressable>
            </View>

            {/* DIARY CONTENT */}
            <Pressable
              style={styles.diaryOpenArea}
              onPress={() => openDetail(entry.id)}
            >
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  greeting: {
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.primary,
    fontWeight: "bold",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 5,
  },

  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 5,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },

  banner: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: 22,
    marginBottom: 20,
    overflow: "hidden",
  },

  bannerLabel: {
    color: "#E4E0FF",
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "bold",
  },

  bannerTitle: {
    color: Colors.white,
    fontSize: 21,
    fontWeight: "bold",
    lineHeight: 29,
    marginTop: 12,
    maxWidth: "85%",
  },

  bannerEmoji: {
    position: "absolute",
    right: 15,
    bottom: 5,
    fontSize: 65,
    color: "#AFA7FF",
  },

  stats: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 18,
  },

  statNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primary,
  },

  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 5,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: Colors.text,
  },

  count: {
    fontSize: 11,
    color: Colors.textSecondary,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 15,
    height: 52,
    marginBottom: 20,
  },

  searchIcon: {
    fontSize: 25,
    color: Colors.primary,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },

  clearText: {
    fontSize: 18,
    color: Colors.textSecondary,
    padding: 5,
  },

  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  filterTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
  },

  resetText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "bold",
  },

  moodScroll: {
    marginBottom: 20,
    flexGrow: 0,
  },

  moodContainer: {
    gap: 8,
    paddingRight: 5,
  },

  moodChip: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E8E5F0",
  },

  moodChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  moodChipText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "600",
  },

  moodChipTextActive: {
    color: Colors.white,
  },

  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: 28,
    alignItems: "center",
    marginTop: 5,
  },

  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.text,
  },

  emptyDescription: {
    color: Colors.textSecondary,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 8,
  },

  emptyReset: {
    marginTop: 15,
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: Radius.md,
  },

  emptyResetText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 12,
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

  diaryOpenArea: {
    marginTop: 2,
  },

  diaryTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 12,
  },

  diaryTitleCompact: {
    fontSize: 15,
    marginTop: 6,
  },

  diaryDate: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 5,
  },

  diaryBody: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginTop: 10,
  },

  readMore: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: 13,
  },
});
