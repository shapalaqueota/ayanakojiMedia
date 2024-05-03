// themes/theme.ts

import { DefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

export const darkTheme = {
  ...NavigationDarkTheme, // Inherit default dark theme properties
  colors: {
    ...NavigationDarkTheme.colors, // Inherit existing color palette
    background: '#121212', // Dark background
    primary: '#1DB954', // Accent color
    card: '#1C1C1C', // Navigation bar background
    text: '#FFFFFF', // Text color
    border: '#1F1F1F', // Border color
  },
};
