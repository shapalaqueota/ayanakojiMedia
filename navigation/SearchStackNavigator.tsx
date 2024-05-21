import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';

type SearchStackParamList = {
  SearchScreen: undefined;
  SearchResultScreen: { query: string };
};

const SearchStack = createNativeStackNavigator<SearchStackParamList>();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator initialRouteName="SearchScreen">
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Search' }} />
      <SearchStack.Screen name="SearchResultScreen" component={SearchResultScreen} options={{ title: 'Search Results' }} />
    </SearchStack.Navigator>
  );
};

export default SearchStackNavigator;
export type { SearchStackParamList };
