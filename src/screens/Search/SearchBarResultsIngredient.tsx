import {
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../common/store';
import {typing} from './searchBarSlice';
import {
  HorizontalAlignView,
  MiddleSizeText,
  themeColorLightGreen,
} from '../../styles';
import {useState} from 'react';
import {ComponentUsedCounter} from '../../common/ComponentUsedCounter';
import {IconButton} from 'react-native-paper';
import {themeColorGreen} from '../RecipeDetail/Recipestyles';
import {
  excludeButtonCounterPressed,
  includeButtonCounterPressed,
} from './componentSlice';
import {addExcluded, addIncluded, resetKeyword} from './ingredientSlice';
/**
   * 검색창에 뜨는 추천검색어들
   * @param props 
   * searchKeyword: ingredient name
   * searchResults: string[]
   * onPressEventInclude: ()=>{}
   * onPressEventExclude:()=>{}
   * relatedRecommendedSearchResultPressedCounter:number
    setRelatedRecommendedSearchResultPressedCounter:setState
   * @returns 
   */
export function SearchBarResultsIngredient(props: any) {
  const searchResults = props.searchResults;
  // const searchResults: string[] = useSelector(
  //   (state: RootState) => state.searchBar.results,
  // );
  // const dispatch = useDispatch();

  // function onChangeSearch(query: string) {
  //   dispatch(typing({text: query})); //키워드에 따른 text, results 스테이트 업데이트.
  // }
//   console.log(
//     'length:',
//     props.searchKeyword.length,
//     ' len',
//     props.searchKeyword.length > 0 ? 200 : 0,
//   );
  const dispatch = useDispatch();
  function include(item: string) {
    dispatch(includeButtonCounterPressed());
    dispatch(addIncluded({ingredient: item}));
    dispatch(resetKeyword({}));
  }
  function exclude(item: string) {
    dispatch(excludeButtonCounterPressed());
    dispatch(addExcluded({ingredient: item}));
    dispatch(resetKeyword({}));
  }
  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      style={{
        flexGrow: 0,
        height: props.searchKeyword.length > 0 ? 200 : 0,
        width: '100%',
      }}
      data={searchResults}
      keyExtractor={(item, index) => item}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{
            borderColor: 'grey',
            borderWidth: 1,
            height: 50,
            justifyContent: 'center',
            backgroundColor: 'white',
            width: '100%',
          }}
          activeOpacity={1}
        >
          <HorizontalAlignView
            style={{
              alignContent: 'space-between',
              justifyContent: 'space-between',
            }}
            >
            <MiddleSizeText>{item}</MiddleSizeText>
            <HorizontalAlignView
              style={{
                alignContent: 'space-between',
                justifyContent: 'space-between',
              }}>
              <IconButton
                icon={'plus'}
                iconColor={themeColorGreen}
                onPress={() => {
                  include(item);
                }}
              />
              <IconButton
                icon={'close-thick'}
                iconColor={'red'}
                onPress={() => {
                  exclude(item);
                }}
              />
            </HorizontalAlignView>
          </HorizontalAlignView>
        </TouchableOpacity>
      )}
    />
  );
}
