import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Src/Screens/HomeScreen';
import DetailScreen from '../Src/Screens/DetailScreen';
import AddScreen from '../Src/Screens/AddScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name = 'HomeScreen' component = {HomeScreen}/>
      <Stack.Screen name = 'DetailScreen' component = {DetailScreen}/>
      <Stack.Screen name = 'AddScreen' component = {AddScreen}/>
    </Stack.Navigator>

  )
}

export default HomeStack;