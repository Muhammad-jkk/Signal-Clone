import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import MainStackNavigator from './src/MainStackNavigator';
import { Provider } from 'react-redux';
import store from './src/Redux/Store';

export default function App() {
  

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <StatusBar style="light" />
            <MainStackNavigator />
          </Provider>
      </SafeAreaView>
    </>
  );
}

