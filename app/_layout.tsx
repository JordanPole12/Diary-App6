import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DiaryProvider } from "../src/context/DiaryContext";

export default function RootLayout() {
  return (
    <DiaryProvider>
      <StatusBar style="dark" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="detail/[id]" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </DiaryProvider>
  );
}
