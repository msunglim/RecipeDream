/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  Dimensions, View, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView,
} from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import styled from 'styled-components';

export const commonImage = 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg?20201002142956'
export const themeColorDarkGrey = '#121212';
export const themeColorGrey = '#282828';
export const themeColorLightGrey = '#3C3C3C';
export const themeColorSuperLightGrey = '#666666';
export const themeColorBlue = '#1E1E1E';
export const themeColorLightGreen = '#93FF3F';
export const themeColorSuperLightGreen = '#9EFFA9'

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const SmallSizeText = styled(Text)`
  font-size:13px;
  text-align-vertical:center;
  color:black;
`;
export const MiddleSizeText = styled(Text)`
  font-size:15px;
  text-align-vertical:center;
  color:black;
`;
export const LargeSizeText = styled(Text)`
  font-size:17px;
  text-align-vertical:center;
  color:black;
`;
export const HorizontalAlignText = styled(Text)`
  text-align:center;
  color:black;
`;
export const VerticalAlignText = styled(Text)`
  text-align-vertical:center;
  color:black;
`;
export const CenterText = styled(Text)`
  text-align:center;
  text-align-vertical:center;
  color:black;
`;
export const HorizontalAlignView = styled(View)`
  flex-direction:row;
  align-itmes:center;
`;

export const RedBorderView = styled(View)`
  border-width:1px;
  border-color:red;
`;
export const BlueBorderView = styled(View)`
  border-width:1px;
  border-color:blue;
`;