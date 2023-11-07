/* eslint-disable prettier/prettier */
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {MasterHeaderOption} from '../../common/MasterHeaderOption';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SheetProvider} from 'react-native-actions-sheet';
import {
  FoodImage,
  IngredientAmount,
  Section,
  themeColorGreen,
  themeColorOrange,
} from './Recipestyles';
import {
  HorizontalAlignView,
  LargeSizeText,
  UltraSizeText,
  commonImage,
  themeColorLightGreen,
} from '../../styles';
import styled from 'styled-components';
import {
  UsedIngredientItem,
  MissingIngredientItem,
  InstructionItem,
} from './Recipestyles';
import axios from 'axios';
import HTML from 'react-native-render-html';
import {Dimensions} from 'react-native';
import {RECIPE_API_KEY} from '@env';
import {PageRemainTimer} from '../../common/PageRemainTimer';
import {Divider, IconButton} from 'react-native-paper';
const screenWidth = Dimensions.get('window').width;
const Container = styled(ScrollView)`
  padding: 16px;
  padding-top: 0px;
`;
const SectionTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const IngredientsList = styled(Text)`
  margin-bottom: 6px;
`;

const Instructions = styled(Text)`
  margin-bottom: 6px;
`;

const NutritionInfo = styled(Text)`
  margin-bottom: 6px;
`;

const ServingSizeContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const ServingSizeText = styled(Text)`
  margin: 0 16px;
`;
type Props = {
  recipeId?: number;
};
interface RecipeDetailProps {
  missed_ingredients: IngredientProps[];
  used_ingredients: IngredientProps[];
  instructions: string[];
}
interface IngredientProps {
  name: string;
  unit: string;
  amount: number;
}
function RecipeDetail(props: any): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [visitedTime, setVisitedTime] = useState<Date>(new Date());
  function goBack() {
    PageRemainTimer(visitedTime, 'recipeDetailPage');
    navigation.goBack();
  }
  // const name: string = 'Cheesecake';
  const [name, setName] = useState<string>('');
  let recipeID = props.route.params.recipeId;
  let user_set_excluded = props.route.params.excluded; // 유저가 빼고 싶은 재료
  let user_set_included = props.route.params.included; // 유저가 넣고 싶은 재료
  const [recipe, setRecipe] = useState<RecipeDetailProps>({
    missed_ingredients: [],
    used_ingredients: [],
    instructions: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  console.log('recipeID', recipeID);
  console.log(props.route.params.excluded);
  console.log(props.route.params.included);
  const [recipeImageUrl, setRecipeImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (recipeID) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false`,
            {
              headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': RECIPE_API_KEY,
              },
            },
          );
          setRecipeImageUrl(response.data.image);
          console.log('뭐여', response.data);
          setName(response.data.title);
          const ingredients = response.data.extendedIngredients.map(
            (ingredient: IngredientProps) => {
              // 이 레시피에 필요한 모든 재료
              const name: string = ingredient.name;
              const unit: string = ingredient.unit;
              const amount: number = ingredient.amount;
              return {name, unit, amount};
            },
          );
          console.log(ingredients);
          setRecipe({
            missed_ingredients: [],
            used_ingredients: [],
            instructions: [],
          });
          ingredients.forEach((i: any) => {
            if (user_set_included.includes(i.name)) {
              console.log('yes', i);
              //중복된거 안넣음
              // if (recipe.used_ingredients.indexOf(i) == -1) {

              recipe.used_ingredients.push(i); // 사용한 재료 목록에 추가
              // }
            } else {
              console.log('no', i);
              //중복된거 안넣음
              // if (recipe.missed_ingredients.indexOf(i) == -1) {
              recipe.missed_ingredients.push(i); // 놓친 재료 목록에 추가
              // }
            }
          });
          //.으로 분할된 레시피
          let smart_instruction = response.data.instructions.split('.');

          // smart_instruction[0] = smart_instruction[0].replace("Instructions", "")
          // recipe.instructions = smart_instruction
          setRecipe({
            missed_ingredients: recipe.missed_ingredients,
            used_ingredients: recipe.used_ingredients,
            instructions: smart_instruction || [],
          });
          setLoading(false);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [recipeID]);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  function moveForward() {}
  useLayoutEffect(() => {
    navigation.setOptions(
      MasterHeaderOption(
        false,
        true,
        'chevron-left',
        '',
        goBack,
        moveForward,
        name,
      ),
    );
  }, [navigation, name]);
  console.log('사용된것', recipe);

  return (
    <SheetProvider>
      <SafeAreaView>
        <Container>
          <FoodImage
            source={recipeImageUrl ? {uri: recipeImageUrl} : {uri: commonImage}}
          />
          <UltraSizeText>Ingredients</UltraSizeText>
          <Divider />
          <Section>
            {recipe.used_ingredients.map((ingredient, index) => (
              <HorizontalAlignView
                key={'missing' + index}
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <HorizontalAlignView>
                  <IconButton icon={'check'} iconColor={themeColorGreen} />
                  <UsedIngredientItem>
                    {ingredient.name + '\u00A0\u00A0\u00A0'}
                  </UsedIngredientItem>
                </HorizontalAlignView>
                <HorizontalAlignView>
                  <UsedIngredientItem>{ingredient.amount}</UsedIngredientItem>
                  <UsedIngredientItem>{ingredient.unit}</UsedIngredientItem>
                </HorizontalAlignView>
              </HorizontalAlignView>
            ))}
            {recipe.missed_ingredients.map((ingredient, index) => (
              <HorizontalAlignView
                key={'missing' + index}
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <HorizontalAlignView>
                  <IconButton
                    icon={'help-circle'}
                    iconColor={themeColorOrange}
                  />
                  <MissingIngredientItem>
                    {ingredient.name + '\u00A0\u00A0\u00A0'}
                  </MissingIngredientItem>
                </HorizontalAlignView>
                <HorizontalAlignView>
                  <MissingIngredientItem>
                    {ingredient.amount}
                  </MissingIngredientItem>
                  <MissingIngredientItem>
                    {ingredient.unit}
                  </MissingIngredientItem>
                </HorizontalAlignView>
              </HorizontalAlignView>
            ))}
            <Divider />
          </Section>
          <Divider />
          <SectionTitle>Instructions</SectionTitle>
          <Divider />
          {/* <HTML source={{ html: recipe.instructions }} contentWidth={screenWidth} /> */}
          {recipe.instructions.map((instruction, index) => instruction.length > 0 && (
            <View key={'instruction' + index}>
              {instruction.length > 0 && (
                <View key={'instruction' + index}>
                  {/* <HTML source={{ html: instruction }} contentWidth={screenWidth} /> */}
                  {/* 보니까 html인것도있고 string인것도있음. */}
                  <LargeSizeText>
                    {index + ': ' + instruction + '.'}
                  </LargeSizeText>
                </View>
              )}
            </View>
          ))}
          <ServingSizeContainer />
        </Container>
      </SafeAreaView>
    </SheetProvider>
  );
}

export default RecipeDetail;
