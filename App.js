import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>

      <AppNavigation />
    </Provider>
    
  );
}

