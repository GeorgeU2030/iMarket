import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image source={require('../../assets/images/loginimg.jpg')}
      className="w-full h-[400px] object-cover"
      />
        <View className="p-8 rounded-t-3xl mt-[-20px] bg-white shadow-md">
            <Text className="font-semibold text-2xl" style={globalStyles.text}>iMarket</Text>
            <Text className="text-slate-800" style={globalStyles.text}>Your destination to discover and offer products securely and efficiently in our vibrant marketplace.</Text>
            <TouchableOpacity onPress={onPress} className="p-2 bg-[#42ad99] rounded-full mt-16">
            <Text className="text-center text-white text-lg" style={globalStyles.text}>Get Started</Text>
            </TouchableOpacity>
        </View>
            <View className="flex flex-row items-center justify-center mt-2">
                <Image source={require('../../assets/images/icesilogo.jpg')}
                className="w-20 h-20 rounded-full"
                />
            </View>
            <View>
                <Text className="text-center mt-3" style={globalStyles.text}>React Native & Expo</Text>
            </View>
    </View>
  )
}

export const globalStyles = StyleSheet.create({
    text: {
      fontFamily: 'Apple', 
    }
  });