/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from '../screens/MainPage';
const RootStack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      {/* <RootStack.Navigator> */}
      <RootStack.Navigator initialRouteName="MainPage">
        <RootStack.Screen
          name="MainPage"
          component={MainPage}
        />
        
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;