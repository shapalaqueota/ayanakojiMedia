import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function SubscriptionScreen() {
  return (
    <View style={styles.background}>
    
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>
          Watch 1M+ anime series. {'\n'}
          No ads, no interruptions.{'\n'}
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
