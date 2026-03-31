// OPTION C: Uses Stack.Screen orientation prop (declarative, no lockAsync).
// This reproduces the stale interfaceOrientation + requestGeometryUpdate cache bug.
import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function PlayScreenC() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Play — Option C (Landscape)</Text>
      <Text style={{ textAlign: 'center', paddingHorizontal: 20 }}>
        This screen uses Stack.Screen orientation='landscape_right'.{'\n'}
        Root Stack has default orientation='portrait'.{'\n'}
        No lockAsync() — purely declarative.
      </Text>
      <Text style={{ textAlign: 'center', paddingHorizontal: 20, color: '#c00', fontSize: 13 }}>
        BUG 1: Going back does NOT rotate to portrait.{'\n'}
        requestGeometryUpdate fails with "Supported: landscapeRight"{'\n'}
        because UIKit's internal cache is stale during transition.{'\n\n'}
        BUG 2: First navigation may not rotate to landscape{'\n'}
        because windowScene.interfaceOrientation returns stale value.
      </Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
