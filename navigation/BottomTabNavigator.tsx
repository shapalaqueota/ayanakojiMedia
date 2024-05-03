import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
            backgroundColor: '#2A2A2A',
            elevation: 0, 
            shadowOpacity: 0, 
          },
          headerTintColor: 'white',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Subscription') {
            iconName = 'list'; 
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else {
            iconName = 'home'; 
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0E84FF',
        tabBarInactiveTintColor: '#5c5c5c',
        tabBarStyle: {
            backgroundColor: '#2a2a2a', 
            elevation: 0,
            borderTopWidth: 0,
          },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}/>
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
      />
      <Tab.Screen 
        name="Ani+" 
        component={SubscriptionScreen}
        options={{ headerShown: false }}
         />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
       
        />
        
    </Tab.Navigator>
  );
}
