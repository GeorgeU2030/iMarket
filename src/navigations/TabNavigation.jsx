import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
          headerShown:false,
          tabBarActiveTintColor:'#42ad99',
          tabBarStyle:{
            height:55
          }
        }}
        >
          <Tab.Screen name='home' component={HomeScreen} 
          options={{
            tabBarLabel:({color})=>{
              return(
              <Text style={{color:color,fontSize:12,marginBottom:4,fontFamily:'Apple'}}>Home</Text>
            )},
            tabBarIcon:({color,size})=>{
              return (
              <Entypo name="home" size={size} color={color} />
            )}
          }}
          />
          <Tab.Screen name="Explore" component={ExploreScreen} 
           options={{
            tabBarLabel:({color})=>{
              return(
              <Text style={{color:color,fontSize:12,marginBottom:4,fontFamily:'Apple'}}>Explore</Text>
            )},
            tabBarIcon:({color,size})=>{
              return (
                <FontAwesome5 name="search" size={size} color={color} />
            )}
          }}
          />
          <Tab.Screen name="NewPost" component={AddPostScreen} 
           options={{
            tabBarLabel:({color})=>{
              return(
              <Text style={{color:color,fontSize:12,marginBottom:4,fontFamily:'Apple'}}>Add Post</Text>
            )},
            tabBarIcon:({color,size})=>{
              return (
                <Ionicons name="add-circle" size={size} color={color} />
            )}
          }}
          />
          <Tab.Screen name="Profile" component={ProfileScreen} 
           options={{
            tabBarLabel:({color})=>{
              return(
              <Text style={{color:color,fontSize:12,marginBottom:4,fontFamily:'Apple'}}>Profile</Text>
            )},
            tabBarIcon:({color,size})=>{
              return (
              <FontAwesome name="user" size={size} color={color} />
            )}
          }}
          />
        </Tab.Navigator>
    );
}

export const globalStyles = StyleSheet.create({
  text: {
    fontFamily: 'Apple', 
    fontSize:12,
    marginBottom:3,
    color:'#456789'
  }
});