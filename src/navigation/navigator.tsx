/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from '../screens/MainPage';
import SearchPage from '../screens/Search/SearchPage';
import SearchResultPage from '../screens/Search/SearchResultPage';
import RecipeDetail from '../screens/RecipeDetail/RecipeDetail';
const RootStack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      {/* <RootStack.Navigator> */}
      <RootStack.Navigator initialRouteName="SearchPage">
        <RootStack.Screen
          name="MainPage"
          component={MainPage}
        />
        <RootStack.Screen
          name="SearchPage"
          component={SearchPage}
        />
        <RootStack.Screen
          name="SearchResultPage"
          component={SearchResultPage}
        />
        <RootStack.Screen
          name="RecipeDetail"
          component={RecipeDetail}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
