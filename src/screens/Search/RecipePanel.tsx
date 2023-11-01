import { HorizontalAlignView, LargeSizeText } from '../../styles';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { useState } from 'react';
import { PageRemainTimer } from '../../common/PageRemainTimer';

/**
 * 
 * @param props 
 * visitedTime: Date
 * @returns 
 */
export function RecipePanel(props: any) {
  let image = props.image;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  // const [visitedTime,setVisitedTime] =useState<Date>(new Date())
  
  function showRecipeDetail() {
    
    PageRemainTimer(props.visitedTime, 'searchResultPage')

    navigation.navigate('RecipeDetail', { recipeId: props.recipeId, excluded: props.excluded, included: props.included });
    console.log(props.recipeId)
  }

  // function
  return (
    <TouchableOpacity onPress={showRecipeDetail}>
      <HorizontalAlignView>
        <Image
          style={{
            width: 150,
            height: 150,
            //   borderWidth: 1,
            //   borderColor: 'red',
            borderRadius: 15,
          }}
          source={{ uri: image }}
        />
        <View>
          <LargeSizeText>{props.name}</LargeSizeText>
          {/* <LargeSizeText>{props.name}</LargeSizeText> */}
        </View>
      </HorizontalAlignView>
    </TouchableOpacity>
  );
}
