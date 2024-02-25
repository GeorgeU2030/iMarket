import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-react';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const {user} = useUser();
  return (
    <View>
    <View className="flex flex-row items-center gap-4">
      <Image source={{uri:user?.imageUrl}} 
      className="w-12 h-12 rounded-full"
      />
      <View>
        <Text style={styles.textfont} className="text-md">Welcome</Text>
        <Text style={styles.textfont} className="text-lg font-semibold">{user?.fullName}</Text>
      </View>
    </View>

    <View className="flex flex-row items-center gap-2 bg-white p-3 px-5 rounded-full mt-5 border-2 border-[#3B82BF]">
        <Ionicons name="search" size={24} color="#3B82BF" />
        <TextInput placeholder='Search' style={[styles.text, {flex: 1, marginLeft: 2, fontSize: 18, fontWeight: 'semibold'}]}
        onChangeText={(e)=>{
            console.log(e)
        }}
        />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
      fontFamily: 'Apple', 
      flex:1
    },
    textfont:{
    fontFamily: 'Apple',
    }
})