import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MainStackNavigator from './src/MainStackNavigator';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2c68ed',
      secondary: '#FFFFFF',
      tertiary: '#333333'
    },
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider theme={theme}>
          <StatusBar style="light" />
          <MainStackNavigator />
        </PaperProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
