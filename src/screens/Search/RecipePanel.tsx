import {HorizontalAlignView, LargeSizeText} from '../../styles';
import {Image, Text, View} from 'react-native';
export function RecipePanel(props: any) {
  let image = props.image;
  return (
    <HorizontalAlignView>
      <Image
        style={{
          width: 150,
          height: 150,
          //   borderWidth: 1,
          //   borderColor: 'red',
          borderRadius: 15,
        }}
        source={{uri: image}}
      />
      <View>
        <LargeSizeText>{props.name}</LargeSizeText>
        {/* <LargeSizeText>{props.name}</LargeSizeText> */}
      </View>
    </HorizontalAlignView>
  );
}
