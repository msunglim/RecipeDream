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
import {
  CenterView,
  ExcluseMeHorizontally,
  HorizontalAlignView,
  MiddleSizeText,
  SmallSizeText,
} from '../../../styles';
import {CommonButton} from '../../../common/CommonButton';
import {ComponentUsedCounter} from '../../../common/ComponentUsedCounter';
import { SearchBarResultsIngredient } from '../SearchBarResultsIngredient';

/**
 *
 * @param props
 * + 버튼 눌렀을 때 뜨는 것
 * type: boolean
 * original: string[] when cancelled, set it back
 * helperText: string
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
    setCancelButtonCounter(cancelButtonCounter + 1);
    ComponentUsedCounter(
      cancelButtonCounter + 1,
      'AddIngredientModalCancelButton',
    );
    dispatch(cancelAdding({type: type, original: original})); //원래 있던걸로 리턴..
    actionSheetRef.current?.hide();
  }
  function done() {
    setCancelButtonCounter(saveButtonCounter + 1);
    ComponentUsedCounter(saveButtonCounter + 1, 'AddIngredientModalSaveButton');
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
  const [searchIngredientBarCounter, setSearchIngredientBarCounter] =
    useState<number>(0);
  const [cancelButtonCounter, setCancelButtonCounter] = useState<number>(0);
  const [saveButtonCounter, setSaveButtonCounter] = useState<number>(0);
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
            padding: '10%',
          }}>
          <MiddleSizeText>{props.payload.helperText}</MiddleSizeText>
          <Searchbar
            style={{
              marginTop: '5%',
            }}
            keyboardType="default"
            placeholder="Search for ingredients"
            onChangeText={onChangeSearch}
            value={searchKeyword.toString()}
            onFocus={() => {
              setSearchIngredientBarCounter(searchIngredientBarCounter + 1);
              ComponentUsedCounter(
                searchIngredientBarCounter + 1,
                'searchIngredientBar',
              );
              setIsSearchBarFocused(true);
            }}
            onBlur={() => {
              setIsSearchBarFocused(false);
            }}
            autoCapitalize="none"
            onSubmitEditing={() => {
              // console.log("검색할것", searchKeyword)
            }}
          />

          {isSearchBarFocused && (
            <View
              style={{
                zIndex: 1,
              }}>
              <SearchBarResultsIngredient
                searchKeyword={searchKeyword}
                searchResults={searchResults}
                // onPressEvent={onSearchBarResultPressEvent}
                // relatedRecommendedSearchResultPressedCounter={
                //   props.payload.relatedRecommendedSearchResultPressedCounter
                // }
                // setRelatedRecommendedSearchResultPressedCounter={
                //   props.payload.setRelatedRecommendedSearchResultPressedCounter
                // }
              />
            </View>
          )}
          <SelectedIngredients
            // addedIngredients={addedIngredients}
            // removeIngredient={removeIngredient}
            type={type}
          />
          <CenterView
            style={
              {
                marginTop:'20%'
              }
            }>
            <HorizontalAlignView
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <CenterView
                style={{
                  width: '50%',
                }}>
                <CommonButton text={'Cancel'} onPressEvent={cancel} />
              </CenterView>
              <CenterView
                style={{
                  width: '50%',
                }}>
                <CommonButton text={'Save'} onPressEvent={done} />
              </CenterView>
            </HorizontalAlignView>
          </CenterView>
        </View>
      </TouchableWithoutFeedback>
    </ActionSheet>
  );
}

export default AddIngredientModal;
