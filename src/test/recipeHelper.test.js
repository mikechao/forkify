import { CONVERT_EDITED_RECIPE } from '../js/recipeHelper';

describe('Testing converting recipe from UI to model', () => {
  test('converting a recipe with 2 ingredients', () => {
    const editedRecipe = {
      title: 'I am a title',
      sourceUrl: 'http://pizza.com',
      image: 'https://baconmockup.com/300/200',
      publisher: 'Mr. Smith',
      cookingTime: '45',
      servings: '4',
      'ingredient-1': '1,,apple',
      'ingredient-2': '1,,salt',
    };
    const converted = CONVERT_EDITED_RECIPE(editedRecipe);
    expect(editedRecipe.title).toEqual(converted.title);
    expect(editedRecipe.sourceUrl).toEqual(converted.sourceUrl);
    expect(editedRecipe.image).toEqual(converted.image);
    expect(editedRecipe.publisher).toEqual(converted.publisher);
    expect(converted.cookingTime).toBe(45);
    expect(converted.servings).toBe(4);
    expect(converted.ingredients.length).toBe(2);
  });
});
