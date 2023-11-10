/* eslint-disable prettier/prettier */
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {MasterHeaderOption} from '../../common/MasterHeaderOption';
import {Chip, Divider, IconButton, Searchbar} from 'react-native-paper';
import {RootState, store} from '../../common/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {SearchBarResults} from './SearchBarResults';
import {HorizontalAlignView, RedBorderView, SmallSizeText} from '../../styles';
import {
  typing,
  addIncluded,
  addExcluded,
  removeIncluded,
  removeExcluded,
  resetKeyword,
} from './ingredientSlice';
import {SheetManager, SheetProvider} from 'react-native-actions-sheet';
import '../../../sheets';
import {SelectedIngredients} from './SelectedIngredients';
import {ComponentUsedCounter} from '../../common/ComponentUsedCounter';
import {IngredientSearchPanel} from './IngredientSearchPanel';
/*
include 든지 exclude든지 +와 함께 보이는것.
props contians ..
type: 0 for my ingredients, 1 for excluded ingredients
relatedRecommendedSearchResultPressedCounter:number
setRelatedRecommendedSearchResultPressedCounter:setState
*/
function IngredientsPanel(props: any): JSX.Element {
  // const type = props.type;
  // const searchKeyword = useSelector(
  //   (state: RootState) => state.ingredient.text,
  // );
  // const searchResults: string[] = useSelector(
  //   (state: RootState) => state.ingredient.results,
  // );
  // const addedIngredients: string[] = useSelector((state: RootState) =>
  //   type == 0
  //     ? state.ingredient.includedIngredients
  //     : state.ingredient.excludedIngredients,
  // );
  // const dispatch = useDispatch();

  // function onChangeSearch(query: string) {
  //   dispatch(typing({text: query})); //키워드에 따른 text, results 스테이트 업데이트.
  // }
  // const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);
  // function onSearchBarResultPressEvent(item: string) {
  //   if (type == 0) {
  //     //add to my ingredients
  //     dispatch(addIncluded({ingredient: item})); //키워드에 따른 text, results 스테이트 업데이트.
  //   } else if (type == 1) {
  //     //add to exlcuded ingredients
  //     dispatch(addExcluded({ingredient: item})); //키워드에 따른 text, results 스테이트 업데이트.
  //   }
  //   dispatch(resetKeyword({}));
  // }
  // function removeIngredient(item: string) {
  //   if (type == 0) {
  //     dispatch(removeIncluded({ingredient: item})); //키워드에 따른 text, results 스테이트 업데이트.
  //   } else if (type == 1) {
  //     dispatch(removeExcluded({ingredient: item})); //키워드에 따른 text, results 스테이트 업데이트.
  //   }
  // }
  // const original: string[] = useSelector((state: RootState) =>
  //   type == 0
  //     ? state.ingredient.includedIngredients
  //     : state.ingredient.excludedIngredients,
  // );

  const [addIngredientPressedCounter, setAddIngredientPressedCounter] =
    useState<number>(0);
  const dispatch = useDispatch();
  function onChangeSearch(query: string) {
    dispatch(typing({text: query})); //키워드에 따른 text, results 스테이트 업데이트.
  }
  const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);

  const [searchIngredientBarCounter, setSearchIngredientBarCounter] =
    useState<number>(0);
  const [cancelButtonCounter, setCancelButtonCounter] = useState<number>(0);
  const [saveButtonCounter, setSaveButtonCounter] = useState<number>(0);
  return (
    <View>
      <IngredientSearchPanel />
      
      <SmallSizeText>Included ingredients</SmallSizeText>
      <Divider />
      <SelectedIngredients type={0} />
      <SmallSizeText>Excluded ingredients</SmallSizeText>
      <Divider />
      <SelectedIngredients type={1} />
    </View>
  );
}

export default IngredientsPanel;
