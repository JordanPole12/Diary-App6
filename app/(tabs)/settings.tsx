import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { useDiary } from "../../src/context/DiaryContext";
import { Colors, Radius, Spacing } from "../../src/styles/tokens";

export default function SettingsScreen() {
  const { entries, likedIds, compactMode, setCompactMode } = useDiary();

  const handleCompactMode = (value: boolean) => {
    setCompactMode(value);
  };

  const handleAbout = () => {
    Alert.alert(
      "About Diary App",
      "Diary App is a personal space to save your daily stories, feelings, and favorite memories.",
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>PERSONALIZE YOUR EXPERIENCE</Text>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Manage your diary application preferences.
        </Text>
      </View>

      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>♥</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileTitle}>My Diary Space</Text>
          <Text style={styles.profileSubtitle}>
            A little place for your memories.
          </Text>
        </View>
      </View>

      {/* STATISTICS */}
      <Text style={styles.sectionTitle}>Your Activity</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{entries.length}</Text>
          <Text style={styles.statLabel}>Total Diaries</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{likedIds.size}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

      {/* APPEARANCE */}
      <Text style={styles.sectionTitle}>Appearance</Text>

      <View style={styles.settingCard}>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>Compact Mode</Text>
          <Text style={styles.settingDescription}>
            Use a more compact diary layout.
          </Text>
        </View>

        <Switch
          value={compactMode}
          onValueChange={handleCompactMode}
          trackColor={{
            false: "#D8D5E2",
            true: Colors.primary,
          }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* ABOUT */}
      <Text style={styles.sectionTitle}>Information</Text>

      <Pressable style={styles.aboutCard} onPress={handleAbout}>
        <View>
          <Text style={styles.settingTitle}>About Diary App</Text>
          <Text style={styles.settingDescription}>
            Learn more about this application.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Diary App</Text>
        <Text style={styles.footerSubtitle}>Version 1.0.0</Text>
        <Text style={styles.footerMessage}>
          Made with love. Keep your memories alive.
        </Text>
      </View>
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
    fontSize: 13,
    marginTop: 7,
  },

  profileCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 27,
    color: Colors.primary,
  },

  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },

  profileTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },

  profileSubtitle: {
    color: "#E4E0FF",
    fontSize: 11,
    marginTop: 5,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 13,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E8E5F0",
  },

  statNumber: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: "bold",
  },

  statLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 5,
  },

  settingCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E8E5F0",
    marginBottom: 28,
  },

  settingTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  settingTitle: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "bold",
  },

  settingDescription: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 5,
  },

  aboutCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E8E5F0",
  },

  arrow: {
    fontSize: 27,
    color: Colors.primary,
  },

  footer: {
    alignItems: "center",
    marginTop: 40,
  },

  footerTitle: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "bold",
  },

  footerSubtitle: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 5,
  },

  footerMessage: {
    color: Colors.textSecondary,
    fontSize: 10,
    marginTop: 12,
  },
});
