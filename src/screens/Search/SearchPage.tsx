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
  Keyboard,
} from 'react-native';
import {MasterHeaderOption} from '../../common/MasterHeaderOption';
import {Chip, IconButton, Searchbar} from 'react-native-paper';
import {RootState, store} from './../../common/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {resetKeyword, typing} from './searchBarSlice';
import {SearchBarResults} from './SearchBarResults';
import {HorizontalAlignView, RedBorderView, SmallSizeText} from '../../styles';
import IngredientsPanel from './IngredientsPanel';
import '../../../sheets';
import {SheetProvider} from 'react-native-actions-sheet';
import {CommonButton} from '../../common/CommonButton';
/*
검색 첫페이지 
props contians ..

*/
function SearchPage(props: any): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  function goBack() {
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions(
      MasterHeaderOption(
        false,
        true,
        'chevron-left',
        '',
        goBack,
        () => {},
        'Search',
      ),
    );
  }, [navigation]);

  const searchKeyword = useSelector((state: RootState) => state.searchBar.text);
  const included = useSelector(
    (state: RootState) => state.ingredient.includedIngredients,
  );
  const excluded = useSelector(
    (state: RootState) => state.ingredient.excludedIngredients,
  );
  const searchResults: string[] = useSelector(
    (state: RootState) => state.searchBar.results,
  );
  const dispatch = useDispatch();

  function onChangeSearch(query: string) {
    dispatch(typing({text: query})); //키워드에 따른 text, results 스테이트 업데이트.
  }
  function onSearchBarResultPressEvent(item: string) {
    dispatch(typing({text: item})); //키워드에 따른 text, results 스테이트 업데이트.
    // dispatch(resetKeyword({}));
    Keyboard.dismiss();
  }

  const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);
  function goSerach() {
    navigation.navigate('SearchResultPage', {
      searchKeyword: searchKeyword,
      excluded: excluded,
      included: included,
    });
  }
  return (
    <SheetProvider>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            height: '100%',
            // borderColor: 'red',
            // borderWidth: 10,
          }}>
          <Searchbar
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
          {/* included */}
          <IngredientsPanel type={0} />
          {/* excluded */}
          <IngredientsPanel type={1} />

          <CommonButton text={'Search'} onPressEvent={goSerach} />
        </View>
      </TouchableWithoutFeedback>
    </SheetProvider>
  );
}

export default SearchPage;
