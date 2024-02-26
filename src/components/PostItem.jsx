import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'

export default function PostItem({item}) {
  return (
    <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border border-[#3B82BF] mb-10">
    <Image source={{uri:item.image}} 
    className="w-full h-[170px] rounded-lg "
    style={{resizeMode: 'contain'}}
    />
    <View>
        <Text className="text-blue-900 p-1 w-3/4 rounded-full mt-1 font-semibold border border-[#42ad99]">{item.category}</Text>
        <Text className="mt-2 font-semibold">{item.title}</Text>
        <Text className="font-semibold">$ {item.price}</Text>
    </View>
</TouchableOpacity>
  )
}