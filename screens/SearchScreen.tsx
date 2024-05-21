import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SearchStackParamList } from '../navigation/SearchStackNavigator';

const recommendations = [
  'Popular Movie 1',
  'Popular Series 2',
  'Popular Movie 3',
  'Popular Series 4',
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp<SearchStackParamList>>();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResultScreen', { query: searchQuery });
    }
  };

  const renderRecommendation = ({ item }: { item: string }) => (
    <View style={styles.recommendationItem}>
      <Text style={styles.recommendationText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={handleSearchChange}
        value={searchQuery}
        lightTheme={false}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        onSubmitEditing={handleSearchSubmit}
      />
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationHeader}>Recommendations</Text>
        <FlatList
          data={recommendations}
          renderItem={renderRecommendation}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginVertical: 8,
  },
  searchBarInputContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  searchBarInput: {
    color: '#ffffff'
  },
  recommendationContainer: {
    flex: 1,
    marginTop: 16,
  },
  recommendationHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  recommendationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  recommendationText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default SearchScreen;
