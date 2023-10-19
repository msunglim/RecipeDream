/* eslint-disable prettier/prettier */
import { ParamListBase, useNavigation } from '@react-navigation/native';
import {
    NativeStackNavigationOptions,
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import { MasterHeaderOption } from '../../common/MasterHeaderOption';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SheetProvider } from 'react-native-actions-sheet';
import { FoodImage, IngredientAmount, Section } from './Recipestyles';
import { commonImage } from '../../styles';
import styled from 'styled-components';
import { UsedIngredientItem, MissingIngredientItem, InstructionItem } from './Recipestyles';
import axios from 'axios';
import HTML from 'react-native-render-html';
import { Dimensions } from 'react-native';
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
  margin-bottom: 16px;
`;

const Instructions = styled(Text)`
  margin-bottom: 16px;
`;

const NutritionInfo = styled(Text)`
  margin-bottom: 16px;
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
}
interface RecipeDetailProps {
    missed_ingredients: IngredientProps[];
    used_ingredients: IngredientProps[];
    instructions: string;
}
interface IngredientProps {
    'name': string;
    'unit': string;
    'amount': number;
}
function RecipeDetail(props: any): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    function goBack() {
        navigation.goBack();
    }
    const name: string = 'Cheesecake';
    let recipeID = props.route.params.recipeId;
    let user_set_excluded = props.route.params.excluded; // 유저가 빼고 싶은 재료
    let user_set_included = props.route.params.included; // 유저가 넣고 싶은 재료
    const [recipe, setRecipe] = useState<RecipeDetailProps>({
        missed_ingredients: [],
        used_ingredients: [],
        instructions: "",
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
                    'X-API-KEY': ''
                  },
                }
              );
            setRecipeImageUrl(response.data.image);
            const ingredients = response.data.extendedIngredients.map((ingredient : IngredientProps) => { // 이 레시피에 필요한 모든 재료
                const name: string = ingredient.name;
                const unit: string = ingredient.unit;
                const amount: number = ingredient.amount;
                return { name, unit, amount };
              });
                console.log(ingredients);
                setRecipe({
                    missed_ingredients: [],
                    used_ingredients: [],
                    instructions: "",
                });
                ingredients.forEach((i: any) => {
                if (user_set_included.includes(i.name)) {
                    console.log("yes", i);
                    recipe.used_ingredients.push(i); // 사용한 재료 목록에 추가
                } else {
                    console.log("no", i);
                    recipe.missed_ingredients.push(i); // 놓친 재료 목록에 추가
                }
                });
                setRecipe({
                    missed_ingredients: recipe.missed_ingredients,
                    used_ingredients: recipe.used_ingredients,
                    instructions: response.data.instructions || ""
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
    function moveForward() {

    }
    useLayoutEffect(() => {
        navigation.setOptions(MasterHeaderOption(false, true, 'chevron-left', '', goBack, moveForward, name));
    }, [navigation]);
    return (
        <SheetProvider>
            <SafeAreaView>
                <Container>
                <FoodImage source={recipeImageUrl ? { uri: recipeImageUrl } : { uri: commonImage }} />
                    <SectionTitle>Ingredients</SectionTitle>
                    <Section>
                        {recipe.missed_ingredients.map((ingredient, index) => (<>
                            <MissingIngredientItem key={index}>{ingredient.name + '\u00A0\u00A0\u00A0'}<IngredientAmount>{ingredient.amount + " " + ingredient.unit}</IngredientAmount></MissingIngredientItem>
                        </>
                        ))}
                        {recipe.used_ingredients.map((ingredient, index) => (<>
                            <UsedIngredientItem key={index}>{ingredient.name + '\u00A0\u00A0\u00A0'}<IngredientAmount>{ingredient.amount + " " + ingredient.unit}</IngredientAmount></UsedIngredientItem>
                        </>
                        ))}
                    </Section>
                    <SectionTitle>Instructions</SectionTitle>
                    <HTML source={{ html: recipe.instructions }} contentWidth={screenWidth} />
                    <ServingSizeContainer />
                </Container>
            </SafeAreaView></SheetProvider>
    );
}

export default RecipeDetail;