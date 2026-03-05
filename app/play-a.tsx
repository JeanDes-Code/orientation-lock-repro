// OPTION A: Only the landscape screen locks. Portrait screen has no lock.
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Button, Text, View } from 'react-native';

export default function PlayScreenA() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      console.log('[Play-A] Focused — locking to LANDSCAPE_RIGHT');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);

      return () => {
        // Unlock on blur so the previous screen can be whatever it wants
        console.log('[Play-A] Blur — unlocking');
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Play — Option A</Text>
      <Text style={{ textAlign: 'center', paddingHorizontal: 20 }}>
        This screen locks to LANDSCAPE_RIGHT.{'\n'}
        Home screen has NO orientation lock.{'\n'}
        On blur, orientation is unlocked.
      </Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
