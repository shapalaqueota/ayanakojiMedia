import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { darkTheme } from './themes/theme';

export default function App() {
  return (
    <NavigationContainer theme={darkTheme}>
      <StatusBar style="light" backgroundColor={darkTheme.colors.background} />
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
