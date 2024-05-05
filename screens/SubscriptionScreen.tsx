import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';

export default function SubscriptionScreen() {

  const isFocused = useIsFocused();
  
  return (
    <View style={styles.background}>
  
      <Video
        source={require('../assets/background.mp4')}
        style={StyleSheet.absoluteFillObject}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isFocused}
        isLooping
      />

   
      <LinearGradient
        colors={['rgba(0, 0, 0, 1)', 'transparent']}
        locations={[0.1, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topGradient}
      />

      
      <LinearGradient
        colors={['black', 'rgba(0, 0, 0, 1)', 'transparent']}
        locations={[0, 0.4, 1]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.bottomGradient}
      />

     
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>
          Watch 1M+ anime series. {'\n'}
          No ads, no interruptions. {'\n'}
          Watch offline.
        </Text>

        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>

        <Text style={styles.renewalText}>
          Plan renews automatically for 9.99$/month until canceled
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  topGradient: {
    position: 'absolute', 
    left: 0,
    right: 0,
    top: 0,
    height: '20%', 
  },
  bottomGradient: {
    position: 'absolute', 
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%', 
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  heading: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: '#0E84FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  renewalText: {
    color: '#696969',
    fontSize: 14,
    textAlign: 'center',
  },
});
