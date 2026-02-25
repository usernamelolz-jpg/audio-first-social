import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AudioPost, User } from '../types';
import AudioPostCard from '../components/AudioPostCard';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

interface Props {
  route: ProfileScreenRouteProp;
}

// Mock data
const MOCK_USER: User = {
  id: 'user1',
  username: 'alice',
  displayName: 'Alice Wonder',
  followers: 234,
  following: 156,
};

const MOCK_USER_POSTS: AudioPost[] = [
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
];

export default function ProfileScreen({ route }: Props) {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{MOCK_USER.displayName[0]}</Text>
        </View>
        <Text style={styles.displayName}>{MOCK_USER.displayName}</Text>
        <Text style={styles.username}>@{MOCK_USER.username}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{MOCK_USER_POSTS.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{MOCK_USER.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{MOCK_USER.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
      
      <FlatList
        data={MOCK_USER_POSTS}
        renderItem={({ item }) => (
          <AudioPostCard post={item} onProfilePress={() => {}} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
  },
  displayName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 32,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    paddingVertical: 8,
  },
});
