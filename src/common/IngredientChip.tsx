import {Chip} from 'react-native-paper';

/**
 *
 * @param props
 * onCloseEvent
 * item:string
 * color?: string
 * @returns
 */
export function IngredientChip(props: any) {
  // console.log("key", props.index);

  return (
    <Chip
      //   key={props.index}
      //   onPress={() => console.log('Pressed')}
      onClose={() => {
        // removeIngredient(item);
        props.onCloseEvent();
      }}
      style={{
        margin: 5,
        backgroundColor: props.color ? props.color : 'white',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        // flexGrow:0,
        // width:'auto',
        flex:0
      }}>
      {props.item}
    </Chip>
  );
}
