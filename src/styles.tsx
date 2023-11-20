/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import styled from 'styled-components';

export const commonImage =
  'https://media.istockphoto.com/id/528290976/photo/coup-shaped-white-plate.jpg?s=612x612&w=0&k=20&c=VXLeIKJk4GPKwzrDfshEidGPT1UowuMCi028zebps80=';
export const themeColorDarkGrey = '#121212';
export const themeColorGrey = '#282828';
export const themeColorLightGrey = '#3C3C3C';
export const themeColorSuperLightGrey = '#666666';
export const themeColorBlue = '#1E1E1E';
export const themeColorLightGreen = '#93FF3F';
export const themeColorSuperLightGreen = '#9EFFA9';
export const IncludedChipColor = '#d1edf2';
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const SmallSizeText = styled(Text)`
  font-size: 13px;
  text-align-vertical: center;
  color: black;
`;
export const MiddleSizeText = styled(Text)`
  font-size: 15px;
  text-align-vertical: center;
  color: black;
`;
export const LargeSizeText = styled(Text)`
  font-size: 17px;
  text-align-vertical: center;
  color: black;
`;
export const UltraSizeText = styled(Text)`
  font-size: 30px;
  text-align-vertical: center;
  color: black;
`;
export const HorizontalAlignText = styled(Text)`
  text-align: center;
  color: black;
`;
export const VerticalAlignText = styled(Text)`
  text-align-vertical: center;
  color: black;
`;
export const CenterText = styled(Text)`
  text-align: center;
  text-align-vertical: center;
  color: black;
`;
export const HorizontalAlignView = styled(View)`
  flex-direction: row;
  align-itmes: center;
`;

export const RedBorderView = styled(View)`
  border-width: 1px;
  border-color: red;
`;
export const BlueBorderView = styled(View)`
  border-width: 1px;
  border-color: blue;
`;

export const ExcluseMeHorizontally = styled(View)`
  width: 20%;
`;
export const ExcluseMeVertically = styled(View)`
  height: 20%;
`;
export const ExcluseMeVerticallyPX = styled(View)`
  height: 10px;
`;
export const CenterView = styled(View)`
  justify-content: center;
  align-content: center;
  align-items: center;
`;
