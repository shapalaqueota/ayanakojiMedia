import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Dots from 'react-native-dots-pagination';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigation/types';

import {
  SectionContainer,
  SectionHeader,
  SectionTitle,
  SectionArrow,
  HorizontalCard,
  VerticalCard,
  HorizontalImageStyled,
  VerticalImageStyled,
  Overlay,
  TitleContainer,
  TitleText,
  GenreText
} from '../components/StyledComponents';

interface Film {
  id: number;
  title: string;
  description: string;
  is_series: boolean;
  s3_key: string;
}

const HomeScreen: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [carouselItems, setCarouselItems] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
        const response = await fetch('http://192.168.31.127:8080/films', { headers });
        const data: Film[] = await response.json();
        if (response.ok) {
          setFilms(data);
          setCarouselItems(data.slice(0, 5).map((film: Film) => ({
            imageUrl: `https://your-s3-bucket-url/${film.s3_key}`,
            title: film.title,
            subtitle: film.description,
          })));
        } else {
          console.error('Error fetching data:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderCarouselItem = ({ item }: { item: any }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
      <View style={styles.carouselOverlay}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const renderHorizontalItem = ({ item }: { item: Film }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FilmDetails', { id: item.id.toString() })}>
      <HorizontalCard>
        <HorizontalImageStyled source={{ uri: `https://your-s3-bucket-url/${item.s3_key}` }} />
        <TitleContainer>
          <TitleText>{item.title}</TitleText>
          {item.is_series ? <GenreText>Series</GenreText> : null}
        </TitleContainer>
      </HorizontalCard>
    </TouchableOpacity>
  );

  const renderVerticalItem = ({ item }: { item: Film }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FilmDetails', { id: item.id.toString() })}>
      <VerticalCard>
        <VerticalImageStyled source={{ uri: `https://your-s3-bucket-url/${item.s3_key}` }} />
        <Overlay>
          <TitleText>{item.title}</TitleText>
        </Overlay>
      </VerticalCard>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      <Text style={styles.pageTitle}>Home</Text>
      <Carousel
        width={windowWidth}
        height={windowHeight}
        data={carouselItems}
        renderItem={renderCarouselItem}
        onSnapToItem={setActiveIndex}
        autoPlayInterval={5000}
        autoPlay={true}
        loop={true}
        pagingEnabled={true}
        scrollAnimationDuration={600}
      />
      <Dots length={carouselItems.length} active={activeIndex} />
    </View>
  );

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={films}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <SectionContainer>
            <SectionHeader>
              <SectionTitle>{item.title}</SectionTitle>
              <SectionArrow>{"..."}</SectionArrow>
            </SectionHeader>
            <FlatList
              horizontal
              data={[item]}
              renderItem={renderHorizontalItem}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </SectionContainer>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height / 1.5;

const styles = StyleSheet.create({
  pageTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  carouselItem: {
    position: 'relative',
    flex: 1,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  carouselTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  carouselSubtitle: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
