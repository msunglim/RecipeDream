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
import {HorizontalAlignView} from '../../styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../common/store';
import {IngredientChip} from '../../common/IngredientChip';
import {filterAndSortDatas} from './filterData';
import {RecipePanel} from './RecipePanel';

/*
props contians ..
searchKeyword: string
included: string[],
excluded:string[]
*/
function SearchResultPage(props: any): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
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
  const [results, setResults] = useState<Recipe[]>(
    filterAndSortDatas(searchKeyword, included, excluded),
  );
  useEffect(() => {
    let results = filterAndSortDatas(searchKeyword, included, excluded);
    // console.log(results);
    setResults(filterAndSortDatas(searchKeyword, included, excluded));
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
        keyExtractor={(item,index) => item.name + index}
        renderItem={item => (
          <RecipePanel image={item.item.image} name={item.item.name} />
        )}
      />
    </View>
  );
}

export default SearchResultPage;
