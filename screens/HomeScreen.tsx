// src/screens/HomeScreen.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, FlatList, StatusBar} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Dots from 'react-native-dots-pagination';

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
  NumberText,
  GenreText
} from '../components/StyledComponents';

interface CarouselItem {
  imageUrl: string;
  title: string;
  subtitle: string;
}

interface AnimeItem {
  id: string;
  title: string;
  imageUrl: string;
  genre: string;
}

const carouselItems: CarouselItem[] = [
  {
    imageUrl: 'https://virtus-img.cdnvideo.ru/images/as-is/plain/f2/f2c72915-06f4-45f4-bacd-ae35f07e82cd.jpg@jpg',
    title: 'Lessons in Chemistry',
    subtitle: 'A brilliant scientist becomes a TV cooking show host.'
  },
  {
    imageUrl: 'https://virtus-img.cdnvideo.ru/images/as-is/plain/f2/f2c72915-06f4-45f4-bacd-ae35f07e82cd.jpg@jpg',
    title: 'Another Movie',
    subtitle: 'Another description goes here.'
  }
];

const sections = [
  {
    title: 'Top Chart: Anime+',
    data: [
      { id: '1', title: 'The Morning Show', imageUrl: 'https://virtus-img.cdnvideo.ru/images/as-is/plain/f2/f2c72915-06f4-45f4-bacd-ae35f07e82cd.jpg@jpg', genre: 'Drama' },
      { id: '2', title: 'Monarch: Legacy of Monsters', imageUrl: 'https://virtus-img.cdnvideo.ru/images/as-is/plain/f2/f2c72915-06f4-45f4-bacd-ae35f07e82cd.jpg@jpg', genre: 'Adventure' }
    ]
  },
  {
    title: 'Animation Studios',
    data: [
      { id: '1', title: 'Ted Lasso', imageUrl: 'https://virtus-img.cdnvideo.ru/images/as-is/plain/f2/f2c72915-06f4-45f4-bacd-ae35f07e82cd.jpg@jpg', genre: '' },
      { id: '2', title: 'Season Pass', imageUrl: 'https://virtus-img.cdnvideo.ru/images/as-is/plain/f2/f2c72915-06f4-45f4-bacd-ae35f07e82cd.jpg@jpg', genre: '' }
    ]
  }
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height / 1.7;

const renderCarouselItem = ({ item }: { item: CarouselItem }) => (
  <View style={styles.carouselItem}>
    <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
    <View style={styles.carouselOverlay}>
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
    </View>
  </View>
);

const HorizontalList = ({ data }: { data: AnimeItem[] }) => (
  <FlatList
    horizontal
    data={data}
    renderItem={({ item, index }) => (
      <HorizontalCard>
        <HorizontalImageStyled source={{ uri: item.imageUrl }} />
        <TitleContainer>
          <TitleText>{item.title}</TitleText>
          {item.genre ? <GenreText>{item.genre}</GenreText> : null}
        </TitleContainer>
      </HorizontalCard>
    )}
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
  />
);

const VerticalList = ({ data }: { data: AnimeItem[] }) => (
  <FlatList
    horizontal
    data={data}
    renderItem={({ item }) => (
      <VerticalCard>
        <VerticalImageStyled source={{ uri: item.imageUrl }} />
        <Overlay>
          <TitleText>{item.title}</TitleText>
        </Overlay>
      </VerticalCard>
    )}
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
  />
);

const HomeScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderHeader = () => (
    <View>
      <Text style={styles.pageTitle}>Home</Text>
      <Carousel
        width={windowWidth}
        height={windowHeight} // Adjust the height as needed
        data={carouselItems}
        renderItem={renderCarouselItem}
        onSnapToItem={setActiveIndex} // Update the index for dots
        autoPlayInterval={3000} // Adjust this to control autoplay speed
        autoPlay={true}
        loop={true}
        pagingEnabled={true} // Enable snapping to items
        scrollAnimationDuration={600} // Set a faster animation duration
      />
      <Dots
        length={carouselItems.length}
        active={activeIndex}
      />
    </View>
  );

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={sections}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <SectionContainer>
            <SectionHeader>
              <SectionTitle>{item.title}</SectionTitle>
              <SectionArrow>{"..."}</SectionArrow>
            </SectionHeader>
            {item.title === 'Animation Studios' ? (
              <VerticalList data={item.data} />
            ) : (
              <HorizontalList data={item.data} />
            )}
          </SectionContainer>
        )}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  carouselItem: {
    position: 'relative',
    flex: 1
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  carouselTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  carouselSubtitle: {
    color: 'white',
    fontSize: 16
  }
});

export default HomeScreen;
