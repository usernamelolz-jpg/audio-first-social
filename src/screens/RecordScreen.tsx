import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WaveformVisualizer from '../components/WaveformVisualizer';

type RecordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Record'>;

interface Props {
  navigation: RecordScreenNavigationProp;
}

export default function RecordScreen({ navigation }: Props) {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [recordingUri, setRecordingUri] = useState<string>();
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [caption, setCaption] = useState('');

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      
      // Track duration
      const interval = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
      
      recording.setOnRecordingStatusUpdate((status) => {
        if (status.isDoneRecording) {
          clearInterval(interval);
        }
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to start recording');
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) return;
    
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordingUri(uri || undefined);
    setRecording(undefined);
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function handlePost() {
    if (!recordingUri) {
      Alert.alert('Error', 'Please record audio first');
      return;
    }
    
    // TODO: Upload to backend
    Alert.alert('Success', 'Post created! (Backend integration coming soon)', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.recordingArea}>
        <Text style={styles.timerText}>{formatTime(duration)}</Text>
        
        <View style={styles.visualizerContainer}>
          <WaveformVisualizer isRecording={isRecording} />
        </View>
        
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordButtonActive]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? '⏹' : '🎙️'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.instruction}>
          {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
        </Text>
      </View>
      
      {recordingUri && (
        <View style={styles.postSection}>
          <Text style={styles.label}>Add a caption (optional)</Text>
          <TextInput
            style={styles.captionInput}
            placeholder="What's this about?"
            value={caption}
            onChangeText={setCaption}
            multiline
            maxLength={280}
          />
          
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>Post to Feed</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.discardButton}
            onPress={() => {
              setRecordingUri(undefined);
              setDuration(0);
              setCaption('');
            }}
          >
            <Text style={styles.discardButtonText}>Discard</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  recordingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '600',
    color: '#333',
    marginBottom: 32,
  },
  visualizerContainer: {
    width: '100%',
    height: 120,
    marginBottom: 48,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recordButtonActive: {
    backgroundColor: '#333',
  },
  recordButtonText: {
    fontSize: 40,
  },
  instruction: {
    marginTop: 24,
    fontSize: 16,
    color: '#666',
  },
  postSection: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  captionInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    marginBottom: 16,
  },
  postButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  discardButton: {
    padding: 16,
    alignItems: 'center',
  },
  discardButtonText: {
    color: '#FF3B30',
    fontSize: 16,
  },
});
