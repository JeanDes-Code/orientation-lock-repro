import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="play-a" options={{ title: 'Option A (Landscape)' }} />
      <Stack.Screen name="play-b" options={{ title: 'Option B (Landscape)' }} />
    </Stack>
  );
}
