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
} from 'react-native';
import {MasterHeaderOption} from '../../common/MasterHeaderOption';
import {
  HorizontalAlignView,
  IncludedChipColor,
  SmallSizeText,
} from '../../styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../common/store';
import {IngredientChip} from '../../common/IngredientChip';
import {filterAndSortDatas} from './filterData';
import {RecipePanel} from './RecipePanel';
import axios from 'axios';
import { PageRemainTimer } from '../../common/PageRemainTimer';
import { RECIPE_API_KEY } from '@env';
/*
props contians ..
searchKeyword: string
included: string[],
excluded:string[]
*/
function SearchResultPage(props: any): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  // const [isLoading, setIsLoading] = useState<boolean>  => react native paper에서 로딩 이미지 받아와도 좋다.
  const API_KEY = RECIPE_API_KEY;
  const numberOfRecipesShown = 30;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visitedTime,setVisitedTime] =useState<Date>(new Date())
  function goBack() {
    PageRemainTimer(visitedTime, 'searchResultPage')

    navigation.goBack();
  }
  
  function moveForward() {
    // navigation.navigate() 
  }
  useLayoutEffect(() => {
    navigation.setOptions(
      MasterHeaderOption(
        false,
        true,
        'chevron-left',
        '',
        goBack,
        moveForward,
        'Recipes',
      ),
    );
  }, [navigation]);
  //첫방문시, 주어진 정보로 필터링 필요.
  const [searchKeyword, setSearchKeyword] = useState<string>(
    props.route.params.searchKeyword,
  );
  const [excluded, setExcluded] = useState<string[]>(
    props.route.params.excluded,
  );
  //   console.log("excluded", excluded);
  function removeExcluded(target: string) {
    let copy = [...excluded.filter(item => item != target)];
    setExcluded(copy);
  }
  const [included, setIncluded] = useState<string[]>(
    props.route.params.included,
  );
  function removeIncluded(target: string) {
    let copy = [...included.filter(item => item != target)];
    setIncluded(copy);
  }
  interface Recipe {
    name: string;
    ingredients: string[];
    image: string;
  }
  const [intoleranceList, setIntoleranceList] = useState<string[]>(
    props.route.params.intoleranceList,
  );
  const [maxCookingTime, setMaxCookingTime] = useState<number>(
    props.route.params.maxCookingTime,
  );
  
  function removeIntolerance(target: string) {
    let copy = [...intoleranceList.filter(item => item != target)];
    setIntoleranceList(copy);
  }
  const [results, setResults] = useState<any[]>([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const ingredients = included.join(',+'); // 사용자가 입력한 재료를 쉼표로 구분하여 연결
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${numberOfRecipesShown}&apiKey=${API_KEY}`,
        );
        console.log(response.data);
        
        // console.log("Before setting results:", results);
        // console.log(response.data);
        setResults(response.data);
        // console.log("After setting results:", results);
      } catch (error) {
        console.error('API call error:', error);
      }
    };

    fetchRecipes();
  }, [searchKeyword, included, excluded,intoleranceList, maxCookingTime]);
 
  return (
    <View
      style={{
        padding: '10%',
      }}>
      {searchKeyword.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <HorizontalAlignView>
            <SmallSizeText>
              {searchKeyword.length > 0 ? 'Recipes of ' : ''}
            </SmallSizeText>
            <IngredientChip
              onCloseEvent={() => {
                setSearchKeyword('');
              }}
              item={searchKeyword}
            />
          </HorizontalAlignView>
        </View>
      )}
      {included.length > 0 && (
        <HorizontalAlignView
          style={{
            marginTop: '5%',
          }}>
          <SmallSizeText>Included:</SmallSizeText>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={included}
            keyExtractor={item => item.toString()}
            renderItem={item => (
              <IngredientChip
                //   index={index}
                onCloseEvent={() => {
                  removeIncluded(item.item);
                }}
                item={item.item}
                color={IncludedChipColor}
              />
            )}
          />
        </HorizontalAlignView>
      )}
      {excluded.length > 0 && (
        <HorizontalAlignView
          style={{
            marginVertical: '5%',
          }}>
          <SmallSizeText>Excluded:</SmallSizeText>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={excluded}
            keyExtractor={item => item.toString()}
            renderItem={item => (
              <IngredientChip
                //   index={index}
                onCloseEvent={() => {
                  removeExcluded(item.item);
                }}
                item={item.item}
                color="grey"
              />
            )}
          />
        </HorizontalAlignView>
      )}
      {maxCookingTime !== Number.POSITIVE_INFINITY && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <HorizontalAlignView>
            <SmallSizeText>Max Cooking Time:</SmallSizeText>
            <IngredientChip
              onCloseEvent={() => {
                setMaxCookingTime(Number.POSITIVE_INFINITY);
              }}
              item={
                maxCookingTime +
                (maxCookingTime !== 1 ? ' mins' : ' min')
              }
              color="white"
            />
          </HorizontalAlignView>
        </View>
      )}
      {intoleranceList.length > 0 && (
        <HorizontalAlignView
          style={{
            marginVertical: '5%',
          }}>
          <SmallSizeText>Intolerance:</SmallSizeText>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={intoleranceList}
            keyExtractor={item => item.toString()}
            renderItem={item => (
              <IngredientChip
                //   index={index}
                onCloseEvent={() => {
                  removeIntolerance(item.item);
                }}
                item={item.item}
                color="red"
              />
            )}
          />
        </HorizontalAlignView>
      )}
     
      <FlatList
        showsVerticalScrollIndicator={false}
        data={results}
        keyExtractor={(item, index) => item.title + index}
        renderItem={item => (
          <RecipePanel
            image={item.item.image}
            name={item.item.title}
            included={included}
            excluded={excluded}
            recipeId={item.item.id}
            visitedTime={visitedTime}
          />
        )}
      />
    </View>
  );
}

export default SearchResultPage;
