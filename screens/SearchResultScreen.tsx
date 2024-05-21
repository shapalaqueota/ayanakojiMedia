import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../navigation/SearchStackNavigator';

type Props = NativeStackScreenProps<SearchStackParamList, 'SearchResultScreen'>;

const SearchResultScreen: React.FC<Props> = ({ route }) => {
  const { query } = route.params;
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://192.168.31.127:8080/search?query=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  const renderResult = ({ item }: { item: { id: number, title: string, description: string, rating: number, thumbnail: string } }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => console.log(`Selected movie ID: ${item.id}`)}>
      <Image source={{ uri: "https://mint.fiu.edu/wp-content/uploads/2021/10/image-not-available.jpg" }} style={styles.thumbnail} />
      <View style={styles.resultContent}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultDescription}>{item.description}</Text>
        <Text style={styles.resultRating}>{"5.0"}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Поиск: {query}</Text>
      <FlatList
        data={results}
        renderItem={renderResult}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 16,
  },
  resultItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  thumbnail: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  resultContent: {
    flex: 1,
    marginLeft: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultDescription: {
    fontSize: 14,
    color: '#aaa',
  },
  resultRating: {
    fontSize: 14,
    color: '#0E84FF',
    marginTop: 4,
  },
});

export default SearchResultScreen;
