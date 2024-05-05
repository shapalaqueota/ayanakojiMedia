// themes/theme.ts

import { DefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

export const darkTheme = {
  ...NavigationDarkTheme, 
  colors: {
    ...NavigationDarkTheme.colors, 
    background: '#121212', 
    primary: '#1DB954', 
    card: '#1C1C1C', 
    text: '#FFFFFF', 
    border: '#1F1F1F',
  },
};
