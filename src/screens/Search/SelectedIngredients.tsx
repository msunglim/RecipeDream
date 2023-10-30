import {Chip} from 'react-native-paper';
import {IncludedChipColor, RedBorderView} from '../../styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../common/store';
import {removeIncluded, removeExcluded} from './ingredientSlice';
import {View, Text} from 'react-native';
import {IngredientChip} from '../../common/IngredientChip';

/**
 * 추가된 재료들을 보여준다.
 * @param props
 * type: int
 * @returns
 */
export function SelectedIngredients(props: any): JSX.Element {
  // const addedIngredients = props.addedIngredients
  let type = props.type;
  const addedIngredients: string[] = useSelector((state: RootState) =>
    type == 0
      ? state.ingredient.includedIngredients
      : state.ingredient.excludedIngredients,
  );
  const dispatch = useDispatch();
  function removeIngredient(item: string) {
    if (type == 0) {
      dispatch(removeIncluded({ingredient: item})); //키워드에 따른 text, results 스테이트 업데이트.
    } else if (type == 1) {
      dispatch(removeExcluded({ingredient: item})); //키워드에 따른 text, results 스테이트 업데이트.
    }
  }
  return (
    <>
      {addedIngredients.length > 0 && (
        <View
          style={{
            flexWrap: 'wrap',
            // height:300,
            flexDirection: 'row',
            backgroundColor: '#CCCCCC',
            borderRadius: 10,
            padding: '2%',
            marginVertical:'5%',
            // marginBottom:'5%'
          }}>
          {addedIngredients.map((item: any, index: number) => (
            // <Chip
            //   key={index}
            //   onPress={() => console.log('Pressed')}
            //   onClose={() => {
            //     removeIngredient(item);
            //   }}
            //   style={{
            //     margin: 5,
            //   }}>
            //   {item}
            // </Chip>
            <IngredientChip
              key={index}
              // index={index}
              onCloseEvent={() => {
                removeIngredient(item);
              }}
              item={item}
              color={type==0?IncludedChipColor: 'grey'}
            />
          ))}
        </View>
      )}
    </>
  );
}
