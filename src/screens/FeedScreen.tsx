import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AudioPost } from '../types';
import AudioPostCard from '../components/AudioPostCard';

type FeedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Feed'>;

interface Props {
  navigation: FeedScreenNavigationProp;
}

// Mock data for now
const MOCK_POSTS: AudioPost[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'alice',
    audioUri: 'https://example.com/audio1.mp3',
    duration: 45,
    caption: 'Just thinking out loud about AI and the future 🤔',
    createdAt: new Date(),
    likes: 12,
    comments: [],
  },
  {
    id: '2',
    userId: 'user2',
    username: 'bob',
    audioUri: 'https://example.com/audio2.mp3',
    duration: 30,
    caption: 'Morning coffee thoughts ☕',
    createdAt: new Date(Date.now() - 3600000),
    likes: 8,
    comments: [],
  },
];

export default function FeedScreen({ navigation }: Props) {
  const [posts, setPosts] = useState<AudioPost[]>(MOCK_POSTS);

  const handleProfilePress = (userId: string) => {
    navigation.navigate('Profile', { userId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <AudioPostCard post={item} onProfilePress={handleProfilePress} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      
      <TouchableOpacity
        style={styles.recordButton}
        onPress={() => navigation.navigate('Record')}
      >
        <Text style={styles.recordButtonText}>🎙️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 8,
  },
  recordButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recordButtonText: {
    fontSize: 32,
  },
});
