/* eslint-disable prettier/prettier */
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import { MasterHeaderOption } from '../common/MasterHeaderOption';

/*
props contians ..

*/
function MainPage(props: any): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
	function goBack(){
	    navigation.goBack()
	  }  
	  function moveForward(){
	    // navigation.navigate()
	  }
	  useLayoutEffect(()=>{
	    navigation.setOptions(MasterHeaderOption(false,true,'chevron-left','',goBack,moveForward,''))
	  }, [navigation])
  return (
    <View>
        <Text>
            hihi
        </Text>
    </View>
  );
}

export default MainPage;