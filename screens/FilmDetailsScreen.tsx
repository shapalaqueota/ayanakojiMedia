import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video, { ResizeMode } from 'react-native-video';
import { RootStackParamList } from '../navigation/types';

type FilmDetailsScreenRouteProp = RouteProp<RootStackParamList, 'FilmDetails'>;

const FilmDetailsScreen: React.FC = () => {
  const route = useRoute<FilmDetailsScreenRouteProp>();
  const { id } = route.params;

  const [filmDetails, setFilmDetails] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
        const response = await fetch(`http://192.168.31.127:8080/film/${id}`, { headers });
        const data = await response.json();
        if (response.ok) {
          setFilmDetails(data);
        } else {
          Alert.alert('Error', data.error || 'An error occurred');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred');
      }
    };

    const fetchVideoUrl = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
        const response = await fetch(`http://192.168.31.127:8080/film/${id}/content`, { headers });
        const data = await response.json();
        if (response.ok) {
          setVideoUrl(data.url);
        } else {
          Alert.alert('Error', data.error || 'An error occurred');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred');
      }
    };

    fetchFilmDetails();
    fetchVideoUrl();
  }, [id]);

  if (!filmDetails || !videoUrl) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{filmDetails.title}</Text>
      <Text style={styles.description}>{filmDetails.description}</Text>
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: videoUrl }}
          style={styles.video}
          controls
          resizeMode={ResizeMode.CONTAIN}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16),
  },
});

export default FilmDetailsScreen;
