import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components';
export const commonImage =
    'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg?20201002142956';
export const themeColorDarkGrey = '#121212';
export const themeColorGrey = '#282828';
export const themeColorLightGrey = '#3C3C3C';
export const themeColorSuperLightGrey = '#666666';
export const themeColorBlue = '#1E1E1E';
export const themeColorLightGreen = '#4c3fff';
export const themeColorRealBlue = '#4c3fff';
export const themeColorSuperLightGreen = '#9EFFA9';
export const themeColorRed = '#ff2f00';
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const FoodImage = styled(Image)`
  width: 100%;
  padding: 10px;
  height: 300px;
  border-radius: 15px;
`;
export const UsedIngredientItem = styled(Text)`
  margin-bottom: 8px;
  padding: 5px;
  color: ${themeColorRealBlue};
`;
export const MissingIngredientItem = styled(Text)`
  margin-bottom: 8px;
  padding: 5px;
  color: ${themeColorRed};
`;
export const InstructionItem = styled(Text)`
  margin-bottom: 8px;
`;
export const IngredientAmount = styled(Text)`
  font-weight: 800;
`;
export const Section = styled(View)`
  display: flex;
  flex-direction: column;
`;
