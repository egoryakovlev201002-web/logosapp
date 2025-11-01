import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function App() {
  const [chapterText, setChapterText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        // ✅ Change this path to match your actual folder
        const asset = Asset.fromModule(
          require('./data/NEW_TESTAMENT/GOSPELS/MATTHEW/047_MATTHEW_01.md')
        );
        await asset.downloadAsync();
        const file = await FileSystem.readAsStringAsync(asset.localUri);
        setChapterText(file);
      } catch (error) {
        console.error('Error loading markdown:', error);
        setChapterText('# Error\nCould not load file.');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, []);

  if (loading) {
    return (
      <ScrollView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 150,
        }}
      >
        <ActivityIndicator size="large" color="#555" />
        <Text>Loading Matthew 1...</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Markdown>{chapterText}</Markdown>
    </ScrollView>
  );
}
