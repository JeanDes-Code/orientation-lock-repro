import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<'A' | 'B' | null>(null);
  const modeRef = useRef<'A' | 'B' | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (modeRef.current === 'B') {
        // Option B: Home enforces portrait on focus
        console.log('[Home] Focused (Option B) — locking to PORTRAIT_UP');
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      } else if (modeRef.current === 'A') {
        // Option A: Home does NOT lock — relies on play-a unlocking on blur
        console.log('[Home] Focused (Option A) — no lock applied');
      }
    }, [])
  );

  const goA = () => {
    modeRef.current = 'A';
    setMode('A');
    router.push('/play-a');
  };

  const goB = () => {
    modeRef.current = 'B';
    setMode('B');
    router.push('/play-b');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Orientation Lock Repro</Text>

      <View style={{ gap: 8, paddingHorizontal: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Option A — passive portrait</Text>
        <Text style={{ textAlign: 'center' }}>
          Home has NO orientation lock.{'\n'}
          Landscape screen locks + unlocks on blur.
        </Text>
        <Button title="Go to Landscape (Option A)" onPress={goA} />
      </View>

      <View style={{ height: 1, width: '80%', backgroundColor: '#ccc' }} />

      <View style={{ gap: 8, paddingHorizontal: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Option B — enforced portrait</Text>
        <Text style={{ textAlign: 'center' }}>
          Home locks PORTRAIT_UP on focus.{'\n'}
          Landscape screen locks LANDSCAPE_RIGHT on focus.
        </Text>
        <Button title="Go to Landscape (Option B)" onPress={goB} />
      </View>

      {mode && (
        <Text style={{ color: '#888' }}>Last used: Option {mode}</Text>
      )}
    </View>
  );
}
