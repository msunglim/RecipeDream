import { HorizontalAlignView, LargeSizeText } from '../../styles';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';

export function RecipePanel(props: any) {
  let image = props.image;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  function showRecipeDetail() {
    navigation.navigate('RecipeDetail', { recipeId: props.recipeId });
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
