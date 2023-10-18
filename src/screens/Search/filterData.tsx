import { commonImage } from "../../styles";

interface Recipe {
  name: string;
  ingredients: string[];
  image: string;
}

export function filterAndSortDatas(
  //   recipes: Recipe[],
  searchKeyword: string,
  includes: string[],
  excludes: string[],

): Recipe[] {
  const recipes = [
    {name: 'apple', ingredients: ['apple', 'sugar', 'flour'] , image:commonImage},
    {name: 'banana', ingredients: ['banana', 'sugar', 'flour'] , image:commonImage},
    {name: 'carrot', ingredients: ['carrot', 'salt', 'pepper'] , image:commonImage},
    {name: 'chicken', ingredients: ['chicken', 'salt', 'pepper'] , image:commonImage},
    {name: 'beef', ingredients: ['beef', 'salt', 'pepper'] , image:commonImage},
    {name: 'potato', ingredients: ['potato', 'salt', 'pepper'] , image:commonImage},
    {name: 'tomato', ingredients: ['tomato', 'salt', 'pepper'] , image:commonImage},
    {name: 'onion', ingredients: ['onion', 'salt', 'pepper'] , image:commonImage},
    {name: 'garlic', ingredients: ['garlic', 'salt', 'pepper'] , image:commonImage},
    {name: 'pasta', ingredients: ['pasta', 'salt', 'pepper'] , image:commonImage},
    {name: 'rice', ingredients: ['rice', 'salt', 'pepper'] , image:commonImage},
    {name: 'broccoli', ingredients: ['broccoli', 'salt', 'pepper'] , image:commonImage},
    {name: 'spinach', ingredients: ['spinach', 'salt', 'pepper'] , image:commonImage},
    {name: 'lettuce', ingredients: ['lettuce', 'salt', 'pepper'] , image:commonImage},
    {name: 'mushroom', ingredients: ['mushroom', 'salt', 'pepper'] , image:commonImage},
    {name: 'pepper', ingredients: ['pepper', 'salt', 'pepper'] , image:commonImage},
    {name: 'salt', ingredients: ['salt', 'sugar', 'flour'] , image:commonImage},
    {name: 'sugar', ingredients: ['sugar', 'salt', 'pepper'] , image:commonImage},
    {name: 'oregano', ingredients: ['oregano', 'salt', 'pepper'] , image:commonImage},
    {name: 'thyme', ingredients: ['thyme', 'salt', 'pepper'] , image:commonImage},
    {name: 'basil', ingredients: ['basil', 'salt', 'pepper'] , image:commonImage},
    {name: 'paprika', ingredients: ['paprika', 'salt', 'pepper'] , image:commonImage},
    {name: 'cumin', ingredients: ['cumin', 'salt', 'pepper'] , image:commonImage},
    {name: 'curry powder', ingredients: ['curry powder', 'salt', 'pepper'] , image:commonImage},
    {name: 'soy sauce', ingredients: ['soy sauce', 'salt', 'pepper'] , image:commonImage},
    {name: 'olive oil', ingredients: ['olive oil', 'salt', 'pepper'] , image:commonImage},
    {name: 'butter', ingredients: ['butter', 'salt', 'pepper'] , image:commonImage},
    {name: 'cheese', ingredients: ['cheese', 'salt', 'pepper'] , image:commonImage},
    {name: 'egg', ingredients: ['egg', 'salt', 'pepper'] , image:commonImage},
    {name: 'alligator', ingredients: ['alligator', 'salt', 'pepper'] , image:commonImage},
    {name: 'dog', ingredients: ['dog', 'salt', 'pepper'] , image:commonImage},
    {name: 'jazz', ingredients: ['jazz', 'salt', 'pepper'] , image:commonImage},
    {name: 'korean', ingredients: ['korean', 'salt', 'pepper'] , image:commonImage},
    {name: 'love', ingredients: ['love', 'salt', 'pepper'] , image:commonImage},
    {name: 'me', ingredients: ['me', 'salt', 'pepper'] , image:commonImage},
    {name: 'nurse', ingredients: ['nurse', 'salt', 'pepper'] , image:commonImage},
    {name: 'www.google.com', ingredients: ['www.google.com', 'salt', 'pepper'] , image:commonImage},
    {name: 'x-ray', ingredients: ['x-ray', 'salt', 'pepper'] , image:commonImage},
    {name: 'yellow', ingredients: ['yellow', 'salt', 'pepper'] , image:commonImage},
    {name: 'zoo', ingredients: ['zoo', 'salt', 'pepper'] , image:commonImage},
    {name: 'apple', ingredients: ['apple', 'sugar', 'flour'] , image:commonImage},
    {name: 'banana', ingredients: ['banana', 'sugar', 'flour'] , image:commonImage},
    {name: 'carrot', ingredients: ['carrot', 'salt', 'pepper'] , image:commonImage},
    {name: 'chicken', ingredients: ['chicken', 'salt', 'pepper'] , image:commonImage},
    {name: 'beef', ingredients: ['beef', 'salt', 'pepper'] , image:commonImage},
    {name: 'potato', ingredients: ['potato', 'salt', 'pepper'] , image:commonImage},
    {name: 'tomato', ingredients: ['tomato', 'salt', 'pepper'] , image:commonImage},
    {name: 'onion', ingredients: ['onion', 'salt', 'pepper'] , image:commonImage},
    {name: 'garlic', ingredients: ['garlic', 'salt', 'pepper'] , image:commonImage},
    {name: 'pasta', ingredients: ['pasta', 'salt', 'pepper'] , image:commonImage},
    {name: 'rice', ingredients: ['rice', 'salt', 'pepper'] , image:commonImage},
    {name: 'broccoli', ingredients: ['broccoli', 'salt', 'pepper'] , image:commonImage},
    {name: 'spinach', ingredients: ['spinach', 'salt', 'pepper'] , image:commonImage},
    {name: 'lettuce', ingredients: ['lettuce', 'salt', 'pepper'] , image:commonImage},
    {name: 'mushroom', ingredients: ['mushroom', 'salt', 'pepper'] , image:commonImage},
    {name: 'pepper', ingredients: ['pepper', 'salt', 'pepper'] , image:commonImage},
    {name: 'salt', ingredients: ['salt', 'sugar', 'flour'] , image:commonImage},
    {name: 'sugar', ingredients: ['sugar', 'salt', 'pepper'] , image:commonImage},
    {name: 'oregano', ingredients: ['oregano', 'salt', 'pepper'] , image:commonImage},
    {name: 'thyme', ingredients: ['thyme', 'salt', 'pepper'] , image:commonImage},
    {name: 'basil', ingredients: ['basil', 'salt', 'pepper'] , image:commonImage},
    {name: 'paprika', ingredients: ['paprika', 'salt', 'pepper'] , image:commonImage},
    {name: 'cumin', ingredients: ['cumin', 'salt', 'pepper'] , image:commonImage},
    {name: 'curry powder', ingredients: ['curry powder', 'salt', 'pepper'] , image:commonImage},
    {name: 'soy sauce', ingredients: ['soy sauce', 'salt', 'pepper'] , image:commonImage},
    {name: 'olive oil', ingredients: ['olive oil', 'salt', 'pepper'] , image:commonImage},
    {name: 'butter', ingredients: ['butter', 'salt', 'pepper'] , image:commonImage},
    {name: 'cheese', ingredients: ['cheese', 'salt', 'pepper'] , image:commonImage},
    {name: 'egg', ingredients: ['egg', 'salt', 'pepper'] , image:commonImage},
    {name: 'alligator', ingredients: ['alligator', 'salt', 'pepper'] , image:commonImage},
    {name: 'dog', ingredients: ['dog', 'salt', 'pepper'] , image:commonImage},
    {name: 'jazz', ingredients: ['jazz', 'salt', 'pepper'] , image:commonImage},
    {name: 'korean', ingredients: ['korean', 'salt', 'pepper'] , image:commonImage},
    {name: 'love', ingredients: ['love', 'salt', 'pepper'] , image:commonImage},
    {name: 'me', ingredients: ['me', 'salt', 'pepper'] , image:commonImage},
    {name: 'nurse', ingredients: ['nurse', 'salt', 'pepper'] , image:commonImage},
    {name: 'www.google.com', ingredients: ['www.google.com', 'salt', 'pepper'] , image:commonImage},
    {name: 'x-ray', ingredients: ['x-ray', 'salt', 'pepper'] , image:commonImage},
    {name: 'yellow', ingredients: ['yellow', 'salt', 'pepper'] , image:commonImage},
    {name: 'zoo', ingredients: ['zoo', 'salt', 'pepper'] , image:commonImage},
    {name: 'apple', ingredients: ['apple', 'sugar', 'flour'] , image:commonImage},
    {name: 'banana', ingredients: ['banana', 'sugar', 'flour'] , image:commonImage},
    {name: 'carrot', ingredients: ['carrot', 'salt', 'pepper'] , image:commonImage},
    {name: 'chicken', ingredients: ['chicken', 'salt', 'pepper'] , image:commonImage},
    {name: 'beef', ingredients: ['beef', 'salt', 'pepper'] , image:commonImage},
    {name: 'potato', ingredients: ['potato', 'salt', 'pepper'] , image:commonImage},
    {name: 'tomato', ingredients: ['tomato', 'salt', 'pepper'] , image:commonImage},
    {name: 'onion', ingredients: ['onion', 'salt', 'pepper'] , image:commonImage},
    {name: 'garlic', ingredients: ['garlic', 'salt', 'pepper'] , image:commonImage},
    {name: 'pasta', ingredients: ['pasta', 'salt', 'pepper'] , image:commonImage},
    {name: 'rice', ingredients: ['rice', 'salt', 'pepper'] , image:commonImage},
    {name: 'broccoli', ingredients: ['broccoli', 'salt', 'pepper'] , image:commonImage},
    {name: 'spinach', ingredients: ['spinach', 'salt', 'pepper'] , image:commonImage},
    {name: 'lettuce', ingredients: ['lettuce', 'salt', 'pepper'] , image:commonImage},
    {name: 'mushroom', ingredients: ['mushroom', 'salt', 'pepper'] , image:commonImage},
    {name: 'pepper', ingredients: ['pepper', 'salt', 'pepper'] , image:commonImage},
    {name: 'salt', ingredients: ['salt', 'sugar', 'flour'] , image:commonImage},
    {name: 'sugar', ingredients: ['sugar', 'salt', 'pepper'] , image:commonImage},
    {name: 'oregano', ingredients: ['oregano', 'salt', 'pepper'] , image:commonImage},
    {name: 'thyme', ingredients: ['thyme', 'salt', 'pepper'] , image:commonImage},
    {name: 'basil', ingredients: ['basil', 'salt', 'pepper'] , image:commonImage},
    {name: 'paprika', ingredients: ['paprika', 'salt', 'pepper'] , image:commonImage},
    {name: 'cumin', ingredients: ['cumin', 'salt', 'pepper'] , image:commonImage},
    {name: 'curry powder', ingredients: ['curry powder', 'salt', 'pepper'] , image:commonImage},
    {name: 'soy sauce', ingredients: ['soy sauce', 'salt', 'pepper'] , image:commonImage},
    {name: 'olive oil', ingredients: ['olive oil', 'salt', 'pepper'] , image:commonImage},
    {name: 'butter', ingredients: ['butter', 'salt', 'pepper'] , image:commonImage},
    {name: 'cheese', ingredients: ['cheese', 'salt', 'pepper'] , image:commonImage},
    {name: 'egg', ingredients: ['egg', 'salt', 'pepper'] , image:commonImage},
    {name: 'alligator', ingredients: ['alligator', 'salt', 'pepper'] , image:commonImage},
    {name: 'dog', ingredients: ['dog', 'salt', 'pepper'] , image:commonImage},
    {name: 'jazz', ingredients: ['jazz', 'salt', 'pepper'] , image:commonImage},
    {name: 'korean', ingredients: ['korean', 'salt', 'pepper'] , image:commonImage},
    {name: 'love', ingredients: ['love', 'salt', 'pepper'] , image:commonImage},
    {name: 'me', ingredients: ['me', 'salt', 'pepper'] , image:commonImage},
    {name: 'nurse', ingredients: ['nurse', 'salt', 'pepper'] , image:commonImage},
    {name: 'www.google.com', ingredients: ['www.google.com', 'salt', 'pepper'] , image:commonImage},
    {name: 'x-ray', ingredients: ['x-ray', 'salt', 'pepper'] , image:commonImage},
    {name: 'yellow', ingredients: ['yellow', 'salt', 'pepper'] , image:commonImage},
    {name: 'zoo', ingredients: ['zoo', 'salt', 'pepper'] , image:commonImage},
    {name: 'apple', ingredients: ['apple', 'sugar', 'flour'] , image:commonImage},
    {name: 'banana', ingredients: ['banana', 'sugar', 'flour'] , image:commonImage},
    {name: 'carrot', ingredients: ['carrot', 'salt', 'pepper'] , image:commonImage},
    {name: 'chicken', ingredients: ['chicken', 'salt', 'pepper'] , image:commonImage},
    {name: 'beef', ingredients: ['beef', 'salt', 'pepper'] , image:commonImage},
    {name: 'potato', ingredients: ['potato', 'salt', 'pepper'] , image:commonImage},
    {name: 'tomato', ingredients: ['tomato', 'salt', 'pepper'] , image:commonImage},
    {name: 'onion', ingredients: ['onion', 'salt', 'pepper'] , image:commonImage},
    {name: 'garlic', ingredients: ['garlic', 'salt', 'pepper'] , image:commonImage},
    {name: 'pasta', ingredients: ['pasta', 'salt', 'pepper'] , image:commonImage},
    {name: 'rice', ingredients: ['rice', 'salt', 'pepper'] , image:commonImage},
    {name: 'broccoli', ingredients: ['broccoli', 'salt', 'pepper'] , image:commonImage},
    {name: 'spinach', ingredients: ['spinach', 'salt', 'pepper'] , image:commonImage},
    {name: 'lettuce', ingredients: ['lettuce', 'salt', 'pepper'] , image:commonImage},
    {name: 'mushroom', ingredients: ['mushroom', 'salt', 'pepper'] , image:commonImage},
    {name: 'pepper', ingredients: ['pepper', 'salt', 'pepper'] , image:commonImage},
    {name: 'salt', ingredients: ['salt', 'sugar', 'flour'] , image:commonImage},
    {name: 'sugar', ingredients: ['sugar', 'salt', 'pepper'] , image:commonImage},
    {name: 'oregano', ingredients: ['oregano', 'salt', 'pepper'] , image:commonImage},
    {name: 'thyme', ingredients: ['thyme', 'salt', 'pepper'] , image:commonImage},
    {name: 'basil', ingredients: ['basil', 'salt', 'pepper'] , image:commonImage},
    {name: 'paprika', ingredients: ['paprika', 'salt', 'pepper'] , image:commonImage},
    {name: 'cumin', ingredients: ['cumin', 'salt', 'pepper'] , image:commonImage},
    {name: 'curry powder', ingredients: ['curry powder', 'salt', 'pepper'] , image:commonImage},
    {name: 'soy sauce', ingredients: ['soy sauce', 'salt', 'pepper'] , image:commonImage},
    {name: 'olive oil', ingredients: ['olive oil', 'salt', 'pepper'] , image:commonImage},
    {name: 'butter', ingredients: ['butter', 'salt', 'pepper'] , image:commonImage},
    {name: 'cheese', ingredients: ['cheese', 'salt', 'pepper'] , image:commonImage},
    {name: 'egg', ingredients: ['egg', 'salt', 'pepper'] , image:commonImage},
    {name: 'alligator', ingredients: ['alligator', 'salt', 'pepper'] , image:commonImage},
    {name: 'dog', ingredients: ['dog', 'salt', 'pepper'] , image:commonImage},
    {name: 'jazz', ingredients: ['jazz', 'salt', 'pepper'] , image:commonImage},
    {name: 'korean', ingredients: ['korean', 'salt', 'pepper'] , image:commonImage},
    {name: 'love', ingredients: ['love', 'salt', 'pepper'] , image:commonImage},
    {name: 'me', ingredients: ['me', 'salt', 'pepper'] , image:commonImage},
    {name: 'nurse', ingredients: ['nurse', 'salt', 'pepper'] , image:commonImage},
    {name: 'www.google.com', ingredients: ['www.google.com', 'salt', 'pepper'] , image:commonImage},
    {name: 'x-ray', ingredients: ['x-ray', 'salt', 'pepper'] , image:commonImage},
    {name: 'yellow', ingredients: ['yellow', 'salt', 'pepper'] , image:commonImage},
    {name: 'zoo', ingredients: ['zoo', 'salt', 'pepper'] , image:commonImage},
  ];
  
  const filteredDatas = recipes.filter(data => {
    const nameIncludesName = data.name.includes(searchKeyword);
    const includesAnyIncluded = includes.length != 0? includes.some(ingredient =>
      data.ingredients.includes(ingredient),
    ) : true;

    const excludesAllExcluded = excludes.every(
      ingredient => !data.ingredients.includes(ingredient),
    );
    if(nameIncludesName && includesAnyIncluded && excludesAllExcluded){
    // if (nameIncludesName) {
    //   console.log(
    //     'filer 1',
    //     nameIncludesName,
    //     ' serach keyword',
    //     searchKeyword,
    //     ' data: ',
    //     data,
    //   );
    //   console.log('filter2', includesAnyIncluded, " indlcde", includes);
    //   console.log('filter2', excludesAllExcluded, " excldue", excludes);
    //   console.log('data', data);

      return data;
    }
    // return nameIncludesName && includesAnyIncluded && excludesAllExcluded;
  });

  // 정렬: ingredients 배열에서 b의 원소를 가장 많이 포함한 순으로 정렬
  filteredDatas.sort((data1, data2) => {
    const count1 = data1.ingredients.filter(ingredient =>
      includes.includes(ingredient),
    ).length;
    const count2 = data2.ingredients.filter(ingredient =>
      includes.includes(ingredient),
    ).length;

    return count2 - count1; // 내림차순으로 정렬
  });

  return filteredDatas;
}
