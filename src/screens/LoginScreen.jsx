import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'

export default function LoginScreen() {
  return (
    <View>
      <Image source={require('../../assets/images/loginimg.png')}
      className="w-full h-[400px] object-cover"
      />
        <View className="p-10">
            <Text style={globalStyles.text}>iMarket</Text>
            <Text>prueba diferencia</Text>
            <Text style={globalStyles.text}>prueba diferencia</Text>
        </View>
    </View>
  )
}

export const globalStyles = StyleSheet.create({
    text: {
      fontFamily: 'Apple', 
    }
  });