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
    instructions: string[];
}
interface IngredientProps {
    'name': string;
    'unit': string;
    'amount': number;
}
function RecipeDetail(props: Props): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    function goBack() {
        navigation.goBack();
    }
    const name: string = 'Cheesecake';
    const recipeID: number | null = props.recipeId ? props.recipeId : null;

    const [recipe, setRecipe] = useState<RecipeDetailProps>({
        missed_ingredients: [{ 'name': 'sugar', 'unit': 'tsp', 'amount': 2 }, { 'name': 'cream cheese', 'unit': 'tsp', 'amount': 2 }, { 'name': 'biscuit', 'unit': 'tsp', 'amount': 2 }, { 'name': 'All-purpose flour', 'unit': 'tsp', 'amount': 2 }, { 'name': 'frozen blueberry', 'unit': 'tsp', 'amount': 2 }],
        used_ingredients: [{ 'name': 'apple', 'unit': 'tsp', 'amount': 2 }, { 'name': 'eggs', 'unit': 'tsp', 'amount': 2 }, { 'name': 'sugar', 'unit': 'tsp', 'amount': 2 }],
        instructions: ['Pour the mixture into the pan and bake for 35-40 minutes until set. Remove from the oven and leave to cool.',
            'Heat half the blueberries in a pan with 2 tablespoons icing sugar and stir gently until juicy. Squash the blueberries with a fork then continue to cook for a few minutes. Add the remaining blueberries, remove from the heat and allow to cool.',
            'Pour the blueberries over the cheesecake just before serving.'],
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    console.log('recipeID', recipeID);
    const includeNutrition = false;

    useEffect(() => {
        if (recipeID) {
            // const fetchRecipe = async () => {
            //     try {
            //         const response = await axios.get('https://localhost:5000/{}', {
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 // API 키를 필요로 하는 경우 아래에 추가하세요
            //                 // 'X-API-KEY': 'YOUR_SPOONACULAR_API_KEY'
            //             }
            //         });
            //         setRecipe(response.data);
            //         setLoading(false);
            //     } catch (err: any) {
            //         setError(err.message);
            //         setLoading(false);
            //     }
            // };
            // fetchRecipe();
        }
    }, []);

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
                    <FoodImage source={{ uri: commonImage }} />
                    <SectionTitle>Ingredients</SectionTitle>
                    <Section>
                        {recipe.missed_ingredients.map((ingredient, index) => (<>
                            <MissingIngredientItem key={index}>{ingredient.name + '\u00A0\u00A0\u00A0'}<IngredientAmount>{ingredient.amount + ingredient.unit}</IngredientAmount></MissingIngredientItem>
                        </>
                        ))}
                        {recipe.used_ingredients.map((ingredient, index) => (<>
                            <UsedIngredientItem key={index}>{ingredient.name + '\u00A0\u00A0\u00A0'}<IngredientAmount>{ingredient.amount + ingredient.unit}</IngredientAmount></UsedIngredientItem>
                        </>
                        ))}
                    </Section>
                    <SectionTitle>Instructions</SectionTitle>
                    <Instructions>
                        {recipe.instructions.map((instruction, index) => (
                            <InstructionItem key={index}>{`${index + 1}. ${instruction}\n\n`}</InstructionItem>
                        ))}
                    </Instructions>


                    <ServingSizeContainer />
                </Container>
            </SafeAreaView></SheetProvider>
    );
}

export default RecipeDetail;