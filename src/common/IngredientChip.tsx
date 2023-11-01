import {Chip} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {ingredientChipCancelCounterPressed} from '../screens/Search/componentSlice';

/**
 *
 * @param props
 * onCloseEvent
 * item:string
 * color?: string
 * @returns
 */
export function IngredientChip(props: any) {
  const dispatch = useDispatch();
  function cancelIngreident() {
    dispatch(ingredientChipCancelCounterPressed());
  }
  return (
    <Chip
      //   key={props.index}
      //   onPress={() => console.log('Pressed')}
      onClose={() => {
        // removeIngredient(item);
        cancelIngreident();
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
        flex: 0,
      }}>
      {props.item}
    </Chip>
  );
}
