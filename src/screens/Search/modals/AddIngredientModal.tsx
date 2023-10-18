/* eslint-disable prettier/prettier */
import {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import {Button, Searchbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../common/store';
import {
  addExcluded,
  addIncluded,
  cancelAdding,
  resetKeyword,
  typing,
} from '../ingredientSlice';
import {SearchBarResults} from '../SearchBarResults';
import {SelectedIngredients} from '../SelectedIngredients';
import {HorizontalAlignView} from '../../../styles';
import {CommonButton} from '../../../common/CommonButton';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/**
 *
 * @param props
 * + 버튼 눌렀을 때 뜨는 것
 * type: boolean
 * original: string[] when cancelled, set it back
 * @returns
 */
function AddIngredientModal(props: SheetProps) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  // props.payload 같은걸로 받을거받는다.
  let type = props.payload.type;
  // console.log('?');
  const searchKeyword = useSelector(
    (state: RootState) => state.ingredient.text,
  );
  const searchResults: string[] = useSelector(
    (state: RootState) => state.ingredient.results,
  );
  // const original: string[] = useSelector((state: RootState) =>
  //   type == 0
  //     ? state.ingredient.includedIngredients
  //     : state.ingredient.excludedIngredients,
  // );
  const original = props.payload.original;
  function cancel() {
    // console.log("orignal", original);

    dispatch(cancelAdding({type: type, original: original})); //원래 있던걸로 리턴..
    actionSheetRef.current?.hide();
  }
  function done() {
    actionSheetRef.current?.hide();
  }
  const dispatch = useDispatch();

  function onChangeSearch(query: string) {
    dispatch(typing({text: query})); //키워드에 따른 text, results 스테이트 업데이트.
  }
  const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);
  function onSearchBarResultPressEvent(item: string) {
    if (type == 0) {
      //add to my ingredients
      dispatch(addIncluded({ingredient: item})); //키워드에 따른 text, results 스테이트 업데이트.
    } else if (type == 1) {
      //add to exlcuded ingredients
      dispatch(addExcluded({ingredient: item})); //키워드에 따른 text, results 스테이트 업데이트.
    }
    dispatch(resetKeyword({}));
  }
  return (
    <ActionSheet ref={actionSheetRef}>
      {/* <SearchIngredients
    /> */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            // width: 400,
            // height: 400,
            height: '100%',
          }}>
          <Searchbar
            keyboardType="default"
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchKeyword.toString()}
            onFocus={() => {
              setIsSearchBarFocused(true);
            }}
            onBlur={() => {
              setIsSearchBarFocused(false);
            }}
            onSubmitEditing={() => {
              // console.log("검색할것", searchKeyword)
            }}
          />

          {isSearchBarFocused && (
            <SearchBarResults
              searchResults={searchResults}
              onPressEvent={onSearchBarResultPressEvent}
            />
          )}
          <SelectedIngredients
            // addedIngredients={addedIngredients}
            // removeIngredient={removeIngredient}
            type={type}
          />

          <HorizontalAlignView
            style={{
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            {/* <Button
              style={{
                width: 100,
              }}
              mode="contained"
              onPress={() => {
                cancel();
              }}>
              Cancel
            </Button> */}
            {/* <Button
              style={{
                width: 100,
              }}
              mode="contained"
              onPress={() => {
                done();
              }}>
              Save
            </Button> */}
            <CommonButton text={'Cancel'} onPressEvent={cancel} />
            <CommonButton text={'Save'} onPressEvent={done} />
          </HorizontalAlignView>
        </View>
      </TouchableWithoutFeedback>
    </ActionSheet>
  );
}

export default AddIngredientModal;
