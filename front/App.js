import Navigation from "./navigation/Navigation";
import { AppState } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

export default function App() {
  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === 'background') {
      await SecureStore.deleteItemAsync('userInformation');
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return <Navigation />
}