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
  Button,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from 'react-native';
import {MasterHeaderOption} from '../../common/MasterHeaderOption';
import {Chip, Divider, IconButton, List, Searchbar} from 'react-native-paper';
import {RootState, store} from './../../common/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {resetKeyword, typing} from './searchBarSlice';
import {SearchBarResults} from './SearchBarResults';
import {
  CenterView,
  ExcluseMeVertically,
  ExcluseMeVerticallyPX,
  HorizontalAlignView,
  LargeSizeText,
  MiddleSizeText,
  RedBorderView,
  SmallSizeText,
} from '../../styles';
import IngredientsPanel from './IngredientsPanel';
import '../../../sheets';
import {SheetManager, SheetProvider} from 'react-native-actions-sheet';
import {CommonButton} from '../../common/CommonButton';
import {PageRemainTimer} from '../../common/PageRemainTimer';
import {ComponentUsedCounter} from '../../common/ComponentUsedCounter';
import {IntoleranceListSection} from './IntoleranceListSection';
import {cookingTimeSettingTextinputCounterPressed} from './componentSlice';
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
  const [visitedTime, setVisitedTime] = useState<Date>(new Date());
  // console.log("first visited:",visitedTime);
  function goSerach() {
    // const leaveTime = new Date()
    setGoSearchButtonCounter(goSearchButtonCounter + 1);
    ComponentUsedCounter(goSearchButtonCounter + 1, 'goSearchButton');
    PageRemainTimer(visitedTime, 'searchPage');
    navigation.navigate('SearchResultPage', {
      searchKeyword: searchKeyword,
      excluded: excluded,
      included: included,
      maxCookingTime: maxCookingTime,
      intoleranceList: intoleranceList,
    });
    console.log(intoleranceList);
  }

  const [serachBarPressedCounter, setSearchBarPressedCounter] =
    useState<number>(0);
  const [
    relatedRecommendedSearchResultPressedCounter,
    setRelatedRecommendedSearchResultPressedCounter,
  ] = useState<number>(0);
  const [goSearchButtonCounter, setGoSearchButtonCounter] = useState<number>(0);
  //cooking time of recipes in result page will be less or equal to maxCookingTime.
  const [maxCookingTime, setMaxCookingTime] = useState<number>(
    Number.POSITIVE_INFINITY,
  );
  const [intoleranceList, setIntoleranceList] = useState<string[]>([]);
  const isPremiumUser: boolean = useSelector(
    (state: RootState) => state.ingredient.isPremiumUser,
  );
  return (
    <SheetProvider>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ScrollView
          style={{
            // height: '100%',
            paddingHorizontal: '10%',
            paddingTop: '3%',
            // borderColor: 'red',
            // borderWidth: 10,
          }}>
          <Searchbar
            placeholder="Search for recipes"
            onChangeText={onChangeSearch}
            value={searchKeyword.toString()}
            onFocus={() => {
              setSearchBarPressedCounter(serachBarPressedCounter + 1);
              ComponentUsedCounter(
                serachBarPressedCounter + 1,
                'dishNameSearchBarButton',
              );
              setIsSearchBarFocused(true);
            }}
            onBlur={() => {
              setIsSearchBarFocused(false);
            }}
            onSubmitEditing={() => {
              // console.log("검색할것", searchKeyword)
            }}
            autoCapitalize="none"
          />
          {isSearchBarFocused && (
            <SearchBarResults
              searchResults={searchResults}
              onPressEvent={onSearchBarResultPressEvent}
              relatedRecommendedSearchResultPressedCounter={
                relatedRecommendedSearchResultPressedCounter
              }
              setRelatedRecommendedSearchResultPressedCounter={
                setRelatedRecommendedSearchResultPressedCounter
              }
            />
          )}
          {/* included */}
          <IngredientsPanel
            type={0}
            relatedRecommendedSearchResultPressedCounter={
              relatedRecommendedSearchResultPressedCounter
            }
            setRelatedRecommendedSearchResultPressedCounter={
              setRelatedRecommendedSearchResultPressedCounter
            }
          />
          {/* excluded */}
          <Divider />
          <IngredientsPanel
            type={1}
            relatedRecommendedSearchResultPressedCounter={
              relatedRecommendedSearchResultPressedCounter
            }
            setRelatedRecommendedSearchResultPressedCounter={
              setRelatedRecommendedSearchResultPressedCounter
            }
          />
          <Divider />
          <ExcluseMeVerticallyPX />

          {/* business model 2. limited feature for premium users. */}
          {isPremiumUser && (
            <HorizontalAlignView
              style={{
                justifyContent: 'space-between',
              }}>
              <HorizontalAlignView>
                <IconButton icon={'clock-time-two-outline'} />
                <MiddleSizeText>cooking time less than</MiddleSizeText>
              </HorizontalAlignView>

              <TextInput
                placeholder={'min'}
                value={
                  maxCookingTime !== Number.POSITIVE_INFINITY
                    ? maxCookingTime.toString()
                    : undefined
                }
                keyboardType="numeric"
                onChangeText={t => {
                  dispatch(cookingTimeSettingTextinputCounterPressed());
                  if (t == '') {
                    setMaxCookingTime(Number.POSITIVE_INFINITY);
                  } else {
                    setMaxCookingTime(Number(t));
                  }
                }}
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 15,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  minWidth: 50,
                  maxWidth: 100,
                  flexGrow: 0,
                  marginRight: 10,
                }}
              />
            </HorizontalAlignView>
          )}
          {isPremiumUser && <ExcluseMeVerticallyPX />}
          <Divider />
          <IntoleranceListSection
            intoleranceList={intoleranceList}
            setIntoleranceList={setIntoleranceList}
          />
          <CenterView
            style={{
              margin: '10%',
            }}>
            <CommonButton text={'Search'} onPressEvent={goSerach} />
          </CenterView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SheetProvider>
  );
}

export default SearchPage;
