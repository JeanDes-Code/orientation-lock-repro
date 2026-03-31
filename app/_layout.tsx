import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ orientation: 'portrait' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="play-a" options={{ title: 'Option A (Landscape)' }} />
      <Stack.Screen name="play-b" options={{ title: 'Option B (Landscape)' }} />
      <Stack.Screen name="play-c" options={{ title: 'Option C (Declarative)', orientation: 'landscape_right' }} />
    </Stack>
  );
}
