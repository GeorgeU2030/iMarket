import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemList from '../screens/ItemList';

export default function HomeStackNav() {

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} 
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen name='Itemlist' component={ItemList}
      options={({route})=>({
        title:route.params.category,
        headerStyle:{
            backgroundColor:'#3B82BF',
        },
        headerTitleStyle:{
            color:'white',
            fontFamily:'Apple',
            fontWeight:'bold'
        }, 
        headerTintColor:'white'
      })}
      
      />
      
    </Stack.Navigator>
  )
}

