import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { AnimeItem, AnimeTitle } from './StyledComponents';
import { Dimensions, Image } from 'react-native';

interface Anime {
  title: string;
  imageUrl: string;
}

interface CarouselProps {
  data: Anime[];
}

const windowWidth = Dimensions.get('window').width;

const AnimeCarousel: React.FC<CarouselProps> = ({ data }) => {
  const renderItem = ({ item }: { item: Anime }) => (
    <AnimeItem>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: '100%', height: '100%', borderRadius: 5 }}
        resizeMode="cover"
      />
      <AnimeTitle>{item.title}</AnimeTitle>
    </AnimeItem>
  );

  return (
    <Carousel
      width={windowWidth}
      height={200}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default AnimeCarousel;