import { CONVERT_EDITED_RECIPE, IS_RECIPES_EQUAL } from '../js/recipeHelper';

describe('Testing converting recipe from UI to model', () => {
  test('converting a recipe with 2 ingredients', () => {
    const editedRecipe = {
      title: 'I am a title',
      sourceUrl: 'http://pizza.com',
      image: 'https://baconmockup.com/300/200',
      publisher: 'Mr. Smith',
      cookingTime: '45',
      servings: '4',
      'ingredient-1': '1,cup,apple',
      'ingredient-2': ',,salt',
    };
    const converted = CONVERT_EDITED_RECIPE(editedRecipe);
    expect(editedRecipe.title).toEqual(converted.title);
    expect(editedRecipe.sourceUrl).toEqual(converted.sourceUrl);
    expect(editedRecipe.image).toEqual(converted.image);
    expect(editedRecipe.publisher).toEqual(converted.publisher);
    expect(converted.cookingTime).toEqual(expect.any(Number));
    expect(converted.cookingTime).toBe(45);
    expect(converted.servings).toEqual(expect.any(Number));
    expect(converted.servings).toBe(4);
    expect(converted.ingredients.length).toBe(2);

    let { quantity, unit, description } = converted.ingredients[0];
    expect(quantity).toEqual(expect.any(Number));
    expect(quantity).toBe(1);
    expect(unit).toEqual(expect.any(String));
    expect(unit).toBe('cup');
    expect(description).toEqual(expect.any(String));
    expect(description).toEqual('apple');

    ({ quantity, unit, description } = converted.ingredients[1]);
    expect(quantity).toBeNull();
    expect(unit).toEqual(expect.any(String));
    expect(unit.length).toBe(0);
    expect(description).toEqual(expect.any(String));
    expect(description).toEqual('salt');
  });

  test('converting a recipe with 7 ingredients', () => {
    const editedRecipe = {
      title: 'I am a title',
      sourceUrl: 'http://pizza.com',
      image: 'https://baconmockup.com/300/200',
      publisher: 'Mr. Smith',
      cookingTime: '20',
      servings: '2',
      'ingredient-1': '1,cup,apple',
      'ingredient-2': '2,oz,salt',
      'ingredient-3': '3,tsp,sugar',
      'ingredient-4': '4,oz,cheese',
      'ingredient-5': '5,tubs,lard',
      'ingredient-6': '6,cans,olives',
      'ingredient-7': '7,bags,banana',
    };
    const converted = CONVERT_EDITED_RECIPE(editedRecipe);
    expect(converted.title).toBe('I am a title');
    expect(converted.sourceUrl).toBe('http://pizza.com');
    expect(converted.image).toBe('https://baconmockup.com/300/200');
    expect(converted.publisher).toBe('Mr. Smith');
    expect(converted.cookingTime).toEqual(expect.any(Number));
    expect(converted.cookingTime).toBe(20);
    expect(converted.servings).toEqual(expect.any(Number));
    expect(converted.servings).toBe(2);
    expect(converted.ingredients.length).toBe(7);
  });
});

describe('Testing IS_RECIPES_EQUAL', () => {
  test('Recipe should equal it self', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://google.com',
      image: '404.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    expect(IS_RECIPES_EQUAL(recipe, recipe)).toBe(true);
  });

  test('Recipe title changed', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://google.com',
      image: '404.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    const otherRecipe = {
      title: 'Pizza pizza 2',
      sourceUrl: 'http://google.com',
      image: '404.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    expect(IS_RECIPES_EQUAL(recipe, otherRecipe)).toBe(false);
  });

  test('Recipe sourceUrl changed', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://google.com',
      image: '404.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    const otherRecipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: '404.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    expect(IS_RECIPES_EQUAL(recipe, otherRecipe)).toBe(false);
  });

  test('Recipe image changed', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: '404.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    const otherRecipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    expect(IS_RECIPES_EQUAL(recipe, otherRecipe)).toBe(false);
  });

  test('Recipe publisher changed', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    const otherRecipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith JR',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    expect(IS_RECIPES_EQUAL(recipe, otherRecipe)).toBe(false);
  });

  test('Recipe cookingTime changed', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    const otherRecipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 20,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    expect(IS_RECIPES_EQUAL(recipe, otherRecipe)).toBe(false);
  });

  test('Recipe servings changed', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 2,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    const otherRecipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 4,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    expect(IS_RECIPES_EQUAL(recipe, otherRecipe)).toBe(false);
  });

  test('Recipes with different number of ingredients', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 4,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    const otherRecipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 4,
      ingredients: [{ quantity: 1, unit: 'cup', description: 'apple' }],
    };
    expect(IS_RECIPES_EQUAL(recipe, otherRecipe)).toBe(false);
  });

  test('Recipes with 1 ingredient different quantity', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 4,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    const otherRecipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 4,
      ingredients: [
        { quantity: 2, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    expect(IS_RECIPES_EQUAL(recipe, otherRecipe)).toBe(false);
  });

  test('Recipes with 1 ingredient different unit', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 4,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    const otherRecipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 4,
      ingredients: [
        { quantity: 1, unit: 'oz', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    expect(IS_RECIPES_EQUAL(recipe, otherRecipe)).toBe(false);
  });

  test('Recipes with 1 ingredient different description', () => {
    const recipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 4,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'salt' },
      ],
    };
    const otherRecipe = {
      title: 'Pizza pizza',
      sourceUrl: 'http://pizza.com',
      image: 'pizza.jpg',
      publisher: 'John smith',
      cookingTime: 15,
      servings: 4,
      ingredients: [
        { quantity: 1, unit: 'cup', description: 'apple' },
        { quantity: 2, unit: 'bags', description: 'banana' },
      ],
    };
    expect(IS_RECIPES_EQUAL(recipe, otherRecipe)).toBe(false);
  });
});
