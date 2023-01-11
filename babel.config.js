module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [["tailwindcss-react-native/babel"], ["module:react-native-dotenv"]]
  };
};
