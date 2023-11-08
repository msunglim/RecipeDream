import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {CommonButton} from '../../common/CommonButton';
import {ComponentUsedCounter} from '../../common/ComponentUsedCounter';
import {MiddleSizeText, CenterView, HorizontalAlignView} from '../../styles';
import {SearchBarResultsIngredient} from './SearchBarResultsIngredient';
import {SelectedIngredients} from './SelectedIngredients';
import {
  addExcluded,
  addIncluded,
  resetKeyword,
  typing,
} from './ingredientSlice';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../common/store';

export function IngredientSearchPanel() {
  const dispatch = useDispatch();
  const searchKeyword = useSelector(
    (state: RootState) => state.ingredient.text,
  );
  const searchResults: string[] = useSelector(
    (state: RootState) => state.ingredient.results,
  );
  function onChangeSearch(query: string) {
    dispatch(typing({text: query})); //키워드에 따른 text, results 스테이트 업데이트.
  }
  const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);

  const [searchIngredientBarCounter, setSearchIngredientBarCounter] =
    useState<number>(0);
  const [cancelButtonCounter, setCancelButtonCounter] = useState<number>(0);
  const [saveButtonCounter, setSaveButtonCounter] = useState<number>(0);
  return (
    <View
      style={{
        // width: 400,
        // height: 400,
        // height: '100%',
        // padding: '10%',
      }}>
      <Searchbar
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
          />
        </View>
      )}
   
    </View>
  );
}
