/* eslint-disable prettier/prettier */
import { ParamListBase, useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, { useState, useEffect, useLayoutEffect } from 'react';
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
import { MasterHeaderOption } from '../../common/MasterHeaderOption';
import { HorizontalAlignView } from '../../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/store';
import { IngredientChip } from '../../common/IngredientChip';
import { filterAndSortDatas } from './filterData';
import { RecipePanel } from './RecipePanel';
import axios from 'axios';

/*
props contians ..
searchKeyword: string
included: string[],
excluded:string[]
*/
function SearchResultPage(props: any): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  // const [isLoading, setIsLoading] = useState<boolean>  => react native paper에서 로딩 이미지 받아와도 좋다.
  const API_KEY = '';
  const numberOfRecipesShown = 30;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  function goBack() {
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
  const [results, setResults] = useState<any[]>([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const ingredients = included.join(",+");  // 사용자가 입력한 재료를 쉼표로 구분하여 연결
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${numberOfRecipesShown}&apiKey=${API_KEY}`
        );
        // console.log("Before setting results:", results);
        // console.log(response.data);
        setResults(response.data);
        // console.log("After setting results:", results);
      } catch (error) {
        console.error("API call error:", error);
      }
    };

    fetchRecipes();
  }, [searchKeyword, included, excluded]);
  return (
    <View>
      {searchKeyword.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <IngredientChip
            onCloseEvent={() => {
              setSearchKeyword('');
            }}
            item={searchKeyword}
          />
        </View>
      )}

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
            color="green"
          />
        )}
      />
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={results}
        keyExtractor={(item, index) => item.title + index}
        renderItem={item => (
          <RecipePanel image={item.item.image} name={item.item.title} included={included} excluded={excluded} recipeId={item.item.id}/>
        )}
      />

    </View>
  );
}

export default SearchResultPage;
