import { View, Text, FlatList,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PostItem from './PostItem'

export default function Latest({latestItem,heading}) {
  return (
    <View className="mt-3">
      <Text className="font-semibold text-lg text-black">{heading}</Text>

      <FlatList
        data={latestItem}
        numColumns={2}
        renderItem={({item,index})=>(
           <PostItem item={item} />
        )}
      />
    </View>
  )
}