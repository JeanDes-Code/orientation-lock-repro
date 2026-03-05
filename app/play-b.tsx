// OPTION B: Both screens lock. Portrait enforces PORTRAIT_UP, landscape enforces LANDSCAPE_RIGHT.
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Button, Text, View } from 'react-native';

export default function PlayScreenB() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      console.log('[Play-B] Focused — locking to LANDSCAPE_RIGHT');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
      // No unlock on blur — the Home screen will enforce its own PORTRAIT_UP lock
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Play — Option B</Text>
      <Text style={{ textAlign: 'center', paddingHorizontal: 20 }}>
        This screen locks to LANDSCAPE_RIGHT.{'\n'}
        Home screen also locks to PORTRAIT_UP on focus.{'\n'}
        Both sides enforce their orientation.
      </Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
