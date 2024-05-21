import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthorizationScreen from './screens/LoginScreen';
import FilmDetailsScreen from './screens/FilmDetailsScreen'; // Импорт нового экрана
import { darkTheme } from './themes/theme';

const Stack = createStackNavigator();

export default function App() {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    };

    fetchToken();
  }, []);

  return (
    <NavigationContainer theme={darkTheme}>
      <StatusBar style="dark" backgroundColor={darkTheme.colors.background} />
      <Stack.Navigator>
        {userToken ? (
          <>
            <Stack.Screen name="MainApp" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="FilmDetails" component={FilmDetailsScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={AuthorizationScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
