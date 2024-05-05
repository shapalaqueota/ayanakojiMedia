module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    presets: ['@react-native'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
