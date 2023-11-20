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
import { MiddleSizeText } from '../../styles';
import { useState } from 'react';
import { ComponentUsedCounter } from '../../common/ComponentUsedCounter';
/**
 * 검색창에 뜨는 추천검색어들
 * @param props 
 * searchKeyword: ingredient name
 * searchResults: string[]
 * onPressEvent: ()=>{}
 * relatedRecommendedSearchResultPressedCounter:number
  setRelatedRecommendedSearchResultPressedCounter:setState
 * @returns 
 */
export function SearchBarResults(props: any) {
  const searchResults = props.searchResults
  // const searchResults: string[] = useSelector(
  //   (state: RootState) => state.searchBar.results,
  // );
  // const dispatch = useDispatch();

  // function onChangeSearch(query: string) {
  //   dispatch(typing({text: query})); //키워드에 따른 text, results 스테이트 업데이트.
  // }
  // console.log("length:", props.searchKeyword.length, " len",props.searchKeyword.length >0? 200:0);
  
  return (
    <View
    style={{
      zIndex: 1,
    }}>
    <FlatList
      keyboardShouldPersistTaps="handled"
      style={{
        // height: searchResults.length > 0 ? 200 : 0,
        // minHeight:0,
        // maxHeight: 200,
        // borderWidth: 5,
        // borderColor: 'blue',
        
        flexGrow: 0,
        height:props.searchResults.length >0? 200:0,
        // flex:0,
        position:'absolute',
        width:'100%'
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
            backgroundColor:'white',
            width:'100%'
          }}
          onPress={() => {
            props.onPressEvent(item)
            props.setRelatedRecommendedSearchResultPressedCounter(props.relatedRecommendedSearchResultPressedCounter+1)
            ComponentUsedCounter(props.relatedRecommendedSearchResultPressedCounter+1, 'relatedRecommendedKeyword')
            // onChangeSearch(item);
            // Keyboard.dismiss();
          }}
          activeOpacity={1}>
          <MiddleSizeText>{item}</MiddleSizeText>
          
        </TouchableOpacity>
      )}
    />
    </View>
  )
  ;
}
