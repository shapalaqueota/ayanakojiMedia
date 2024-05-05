import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeIcon from './icons/home.svg';
import SearchIcon from './icons/loopkazalupka.svg';
import SubscriptionIcon from './icons/aniPlusNav.svg';

const profilePicture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvBFwvb_Vdhyy2pgn6qUkKtCruOQE0XGuX-_j-FsydWw&s';

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
        tabBarIcon: ({ color, size, focused }) => {
          let IconComponent;

          switch (route.name) {
            case 'Home':
              IconComponent = HomeIcon;
              break;
            case 'Search':
              IconComponent = SearchIcon;
              break;
            case 'AniMedia+':
              IconComponent = SubscriptionIcon;
              break;
            case 'Profile':
              return (
                <View
                  style={{
                    borderColor: focused ? '#0E84FF' : 'transparent',
                    borderWidth: 3,
                    borderRadius: 100, 
                  }}
                >
                  <Image
                    source={{ uri: profilePicture }}
                    style={{ width: size, height: size, borderRadius: size / 2 }}
                  />
                </View>
              );
            default:
              IconComponent = HomeIcon;
              break;
          }

          return <IconComponent width={size} height={size} fill={color} />;
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
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="AniMedia+" component={SubscriptionScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
