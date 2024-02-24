import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import LoginScreen from './src/screens/LoginScreen';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App() {

  const [fontsLoaded] = useFonts({
    'Apple': require('./assets/fonts/SFUIText-RegularG3.otf'),
  });

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <View className="flex-1  bg-white">
     
      <SignedIn>
          <Text>You are Signed in</Text>
      </SignedIn>
      <SignedOut>
          <LoginScreen />
      </SignedOut>
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
  );
}

export const globalStyles = StyleSheet.create({
  text: {
    fontFamily: 'Apple', 
  }
});

