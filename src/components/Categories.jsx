import { View, Text , StyleSheet, FlatList,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categories({categoryList}) {

  const navigation = useNavigation()
  return (
    <View className="mt-5">
      <Text className="font-semibold text-lg text-black" style={styles.text}>Categories</Text>
      <FlatList
      data={categoryList}
      numColumns={3}
      renderItem={({item,index})=>(
        <TouchableOpacity className="flex-1 items-center justify-center p-2 border-[1px] border-gray-400
        m-1 h-32 rounded-lg bg-blue-50"
        onPress={()=>navigation.navigate('Itemlist',{category:item.name})}
        >
          <Image source={{uri:item.icon}}
          className="w-20 h-20"
          />
          <Text className="text-sm text-center mt-2" style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
      fontFamily: 'Apple', 
    }
})
