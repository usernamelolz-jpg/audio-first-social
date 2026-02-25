import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AudioPost } from '../types';
import AudioPlayer from './AudioPlayer';

interface AudioPostCardProps {
  post: AudioPost;
  onProfilePress: (userId: string) => void;
}

export default function AudioPostCard({ post, onProfilePress }: AudioPostCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onProfilePress(post.userId)}>
          <Text style={styles.username}>@{post.username}</Text>
        </TouchableOpacity>
        <Text style={styles.timestamp}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </View>
      
      {post.caption && (
        <Text style={styles.caption}>{post.caption}</Text>
      )}
      
      <AudioPlayer audioUri={post.audioUri} duration={post.duration} />
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>❤️ {post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 {post.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>🔁</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  caption: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    padding: 8,
  },
  actionText: {
    fontSize: 16,
  },
});
