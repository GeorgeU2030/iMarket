import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'

export default function HomeScreen() {
  
  return (
    <View className="py-10 px-8 bg-white flex-1"> 
     <Header />
     <Slider />
    </View>
  )
}