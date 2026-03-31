import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 20));

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 24, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Orientation Lock Repro</Text>
      <Text style={{ color: '#888', textAlign: 'center', fontSize: 12 }}>
        expo-dev-client + react-native-screens 4.23 + expo-screen-orientation 55.0.9
      </Text>

      <View style={{ gap: 6, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Option C — declarative (the bug)</Text>
        <Text style={{ textAlign: 'center', fontSize: 13, color: '#666' }}>
          Uses Stack.Screen orientation='landscape_right'.{'\n'}
          Root Stack defaults to orientation='portrait'.{'\n'}
          No lockAsync() — purely declarative.
        </Text>
        <Button title="Go to Landscape (Option C)" onPress={() => {
          addLog('Navigate → play-c (landscape_right)');
          router.push('/play-c');
        }} />
        <Text style={{ fontSize: 11, color: '#c00', textAlign: 'center' }}>
          BUG: First nav locks landscape. Back does NOT restore portrait.{'\n'}
          Second nav to landscape also fails.
        </Text>
      </View>

      <View style={{ height: 1, width: '80%', backgroundColor: '#ddd' }} />

      <View style={{ gap: 6, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Option A — lockAsync passive</Text>
        <Text style={{ textAlign: 'center', fontSize: 13, color: '#666' }}>
          Landscape locks + unlocks on blur.{'\n'}
          Home has NO lock.
        </Text>
        <Button title="Go to Landscape (Option A)" onPress={() => {
          addLog('Navigate → play-a');
          router.push('/play-a');
        }} />
      </View>

      <View style={{ height: 1, width: '80%', backgroundColor: '#ddd' }} />

      <View style={{ gap: 6, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Option B — lockAsync enforced</Text>
        <Text style={{ textAlign: 'center', fontSize: 13, color: '#666' }}>
          Both screens lock explicitly.
        </Text>
        <Button title="Go to Landscape (Option B)" onPress={() => {
          addLog('Navigate → play-b');
          router.push('/play-b');
        }} />
      </View>

      {log.length > 0 && (
        <View style={{ width: '100%', padding: 10, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
          <Text style={{ fontWeight: '600', marginBottom: 4 }}>Log:</Text>
          {log.map((l, i) => <Text key={i} style={{ fontSize: 11, color: '#666' }}>{l}</Text>)}
        </View>
      )}
    </ScrollView>
  );
}
