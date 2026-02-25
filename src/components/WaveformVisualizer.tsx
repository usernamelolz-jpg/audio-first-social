import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface WaveformVisualizerProps {
  isRecording: boolean;
  barCount?: number;
}

export default function WaveformVisualizer({ 
  isRecording, 
  barCount = 40 
}: WaveformVisualizerProps) {
  const animatedValues = useRef(
    Array.from({ length: barCount }, () => new Animated.Value(0.2))
  ).current;

  useEffect(() => {
    if (isRecording) {
      const animations = animatedValues.map((animValue, index) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(animValue, {
              toValue: Math.random() * 0.8 + 0.2,
              duration: 150 + Math.random() * 100,
              easing: Easing.ease,
              useNativeDriver: false,
            }),
            Animated.timing(animValue, {
              toValue: Math.random() * 0.8 + 0.2,
              duration: 150 + Math.random() * 100,
              easing: Easing.ease,
              useNativeDriver: false,
            }),
          ])
        );
      });

      // Stagger the start of each bar slightly
      animations.forEach((anim, index) => {
        setTimeout(() => anim.start(), index * 20);
      });

      return () => {
        animations.forEach(anim => anim.stop());
      };
    } else {
      // Reset to minimum height when not recording
      animatedValues.forEach(animValue => {
        Animated.timing(animValue, {
          toValue: 0.2,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [isRecording]);

  return (
    <View style={styles.container}>
      {animatedValues.map((animValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              height: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['20%', '100%'],
              }),
              opacity: isRecording ? 1 : 0.3,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: '100%',
    gap: 3,
  },
  bar: {
    width: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 2,
  },
});
