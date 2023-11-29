import {
  ExcluseMeHorizontally,
  HorizontalAlignView,
  LargeSizeText,
  SmallSizeText,
} from '../../styles';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {useState} from 'react';
import {PageRemainTimer} from '../../common/PageRemainTimer';

/**
 *
 * @param props
 * visitedTime: Date
 * @returns
 */
export function RecipePanel(props: any) {
  let totalIngredientsCount = props.totalIngredientsCount;
  let image = props.image;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  // const [visitedTime,setVisitedTime] =useState<Date>(new Date())

  function showRecipeDetail() {
    PageRemainTimer(props.visitedTime, 'searchResultPage');

    navigation.navigate('RecipeDetail', {
      recipeId: props.recipeId,
      excluded: props.excluded,
      included: props.included,
    });
    console.log(props.recipeId);
  }
 
  // function
  return (
    <TouchableOpacity
      onPress={showRecipeDetail}
      style={{
        margin: 3,
        // borderColor: 'grey',
        // borderWidth: 1,
        flex:1
      }}>
      <HorizontalAlignView
      style={{
        flex:1
      }}
      >
        <Image
          style={{
            width: 150,
            height: 150,
            flex:1,
            //   borderWidth: 1,
            //   borderColor: 'red',
            borderRadius: 15,
          }}
          source={{uri: image}}
        />
        <View style={{
          flex:1
        }}>
          <LargeSizeText numberOfLines={2} style={{flexWrap: 'wrap'}}>
            {props.name}
          </LargeSizeText>
          <SmallSizeText>{props.included.length === 0 ? totalIngredientsCount : props.missedIngredientCount} Missing</SmallSizeText>
        </View>
        {/* <LargeSizeText>{props.name}</LargeSizeText> */}
      </HorizontalAlignView>
    </TouchableOpacity>
  );
}
// import {
//   ExcluseMeHorizontally,
//   HorizontalAlignView,
//   LargeSizeText,
//   SmallSizeText,
// } from '../../styles';
// import {Image, Text, View, TouchableOpacity} from 'react-native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useNavigation, ParamListBase} from '@react-navigation/native';
// import {useState} from 'react';
// import {PageRemainTimer} from '../../common/PageRemainTimer';

// /**
//  *
//  * @param props
//  * visitedTime: Date
//  * @returns
//  */
// export function RecipePanel(props: any) {
//   let image = props.image;
//   const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
//   // const [visitedTime,setVisitedTime] =useState<Date>(new Date())

//   function showRecipeDetail() {
//     PageRemainTimer(props.visitedTime, 'searchResultPage');

//     navigation.navigate('RecipeDetail', {
//       recipeId: props.recipeId,
//       excluded: props.excluded,
//       included: props.included,
//     });
//     console.log(props.recipeId);
//   }

//   // function
//   return (
//     <TouchableOpacity
//       onPress={showRecipeDetail}
//       style={{
//         margin: 3,
//         // borderColor: 'grey',
//         // borderWidth: 1,
//       }}>
//       <HorizontalAlignView>
//         <Image
//           style={{
//             width: 150,
//             height: 150,
//             //   borderWidth: 1,
//             //   borderColor: 'red',
//             borderRadius: 15,
//           }}
//           source={{uri: image}}
//         />
//         <View>
//           <LargeSizeText numberOfLines={2} style={{flexWrap: 'wrap'}}>
//             {props.name}
//           </LargeSizeText>
//           <SmallSizeText> 3 Missiing</SmallSizeText>
//         </View>
//         {/* <LargeSizeText>{props.name}</LargeSizeText> */}
//       </HorizontalAlignView>
//     </TouchableOpacity>
//   );
// }
