import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Apple': require('./assets/fonts/SFUIText-RegularG3.otf'),
  });

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }
  return (
    <View className="flex-1  bg-white">
      <LoginScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

export const globalStyles = StyleSheet.create({
  text: {
    fontFamily: 'Apple', 
  }
});

