/**
 * @jest-environment jsdom
 */
import { async } from 'regenerator-runtime';
import * as testHelper from './testHelper';

const html = testHelper.indexHTMLContent().toString();
process.env['NODE_DEV'] = 'TEST-112233';

describe('controller test controlRecipes', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should render the starting state since no id in hash', async () => {
    let controller;
    await jest.isolateModulesAsync(async () => {
      controller = await import('../js/controller');
    });
    await controller.controlRecipes();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should the test recipe render correctly', async () => {
    const nutritionWdigetContent = testHelper.nutritionWdigetContent();
    const recipe = testHelper.getRecipe();
    let controller;
    let model;
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.search.query = 'tea';
      model.state.search.page = 2;
      model.state.search.resultsPerPage = 1;
      model.state.search.results = [];
      model.state.bookmarks = [];
      model.state.recipe = recipe;
      controller = await import('../js/controller');
    });
    jest.spyOn(model, 'loadRecipe').mockImplementation(() => []);
    jest
      .spyOn(model, 'getNutritionWidget')
      .mockImplementation(() => nutritionWdigetContent);
    window.location.hash = '#' + testHelper.getNonBookmarkedRecipeId();
    await controller.controlRecipes();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render the error message', async () => {
    let controller;
    let model;
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.search.query = 'apple';
      model.state.search.page = 4;
      model.state.search.resultsPerPage = 5;
      model.state.search.results = [];
      model.state.bookmarks = [];
      controller = await import('../js/controller');
    });
    window.location.hash = '#' + testHelper.getNonBookmarkedRecipeId();
    jest.spyOn(model, 'loadRecipe').mockImplementation(() => {
      throw new Error('test error');
    });
    await controller.controlRecipes();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});

describe('controller test controlSearchResults', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should render the default view with no search query', async () => {
    let controller;
    await jest.isolateModulesAsync(async () => {
      controller = await import('../js/controller');
    });
    await controller.controlSearchResults();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render the search views correctly', async () => {
    let model;
    let controller;
    const searchResults = testHelper.searchRecipesResults().data.recipes;
    const searchField = document.querySelector('.search__field');
    searchField.defaultValue = 'tea';
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.search.query = 'tea';
      model.state.search.page = 1;
      model.state.search.resultsPerPage = 10;
      model.state.search.results = searchResults;
      model.state.bookmarks = [];
      controller = await import('../js/controller');
    });
    jest.spyOn(model, 'loadSearchResults').mockImplementation(() => []);
    await controller.controlSearchResults();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});

describe('controller test controlPagination', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should render the search results correctly', async () => {
    let controller;
    let model;
    const searchResults = testHelper.searchRecipesResults().data.recipes;
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.search.query = 'tea';
      model.state.search.page = 1;
      model.state.search.resultsPerPage = 1;
      model.state.search.results = searchResults;
      model.state.bookmarks = [];
      controller = await import('../js/controller');
    });
    controller.controlPagination(2);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});

describe('controller test controlSearchResults', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should render the recipe updated to 3 servings', async () => {
    let controller;
    let model;
    let recipeView;
    const recipe = testHelper.getRecipe();
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.recipe = recipe;
      const recipeViewM = await import('../js/views/recipeView');
      recipeView = recipeViewM.default;
      controller = await import('../js/controller');
    });
    recipeView.render(recipe);
    controller.controlServings(3);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});

describe('controller test controllAddBookmark', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should bookmark the current recipe and render it correctly', async () => {
    let controller;
    let model;
    let recipeView;
    const recipe = testHelper.getRecipe(false);
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.bookmarks = [];
      model.state.recipe = recipe;
      const recipeViewM = await import('../js/views/recipeView');
      recipeView = recipeViewM.default;
      controller = await import('../js/controller');
    });
    recipeView.render(recipe);
    controller.controlAddBookmark();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should remove bookmark and render it correctly', async () => {
    let controller;
    let model;
    let recipeView;
    const recipe = testHelper.getRecipe(true);
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.bookmarks = [recipe];
      model.state.recipe = recipe;
      const recipeViewM = await import('../js/views/recipeView');
      recipeView = recipeViewM.default;
      controller = await import('../js/controller');
    });
    recipeView.render(recipe);
    controller.controlAddBookmark();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});

describe('controller test controlDeleteUserRecipe', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should just render the starting view since you can not delete a recipe without the key property', async () => {
    let controller;
    let model;
    const recipe = testHelper.getRecipe(true);
    delete recipe.key;
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.bookmarks = [];
      model.state.recipe = recipe;
      controller = await import('../js/controller');
    });
    await controller.controlDeleteUserRecipe();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should return status true', async () => {
    let controller;
    let model;
    const recipe = testHelper.getRecipe(true);
    const searchResults = testHelper.searchRecipesResults().data.recipes;
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.bookmarks = [];
      model.state.recipe = recipe;
      model.state.search.query = 'tea';
      model.state.search.page = 1;
      model.state.search.resultsPerPage = 1;
      model.state.search.results = searchResults;
      controller = await import('../js/controller');
    });
    jest.spyOn(model, 'deleteUserRecipe').mockImplementation(() => []);
    const result = await controller.controlDeleteUserRecipe();
    expect(result.status).toBe(true);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should return false when model.deleteUserRecipe throws error', async () => {
    let controller;
    let model;
    const recipe = testHelper.getRecipe(true);
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.recipe = recipe;
      controller = await import('../js/controller');
    });
    const errorMessage = 'This is a test error';
    jest.spyOn(model, 'deleteUserRecipe').mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const result = await controller.controlDeleteUserRecipe();
    expect(result.status).toBe(false);
    expect(result.message).toBe(errorMessage);
  });
});

describe('controller test controlBookmarks', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should render the bookmarks correctly', async () => {
    let controller;
    let model;
    const bookmarks = testHelper.bookmarkedRecipes();
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.bookmarks = bookmarks;
      controller = await import('../js/controller');
    });
    controller.controlBookmarks();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});

describe('controller test controlAddRecipe', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should render correclty', async () => {
    let controller;
    let model;
    jest.useFakeTimers();
    const recipe = testHelper.getRecipe(true);
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.recipe = recipe;
      model.state.bookmarks = [];
      controller = await import('../js/controller');
    });
    const nutritionWdigetContent = testHelper.nutritionWdigetContent();
    jest.spyOn(model, 'uploadRecipe').mockImplementation(() => []);
    jest
      .spyOn(model, 'getNutritionWidget')
      .mockImplementation(() => nutritionWdigetContent);
    const asyncResult = controller.controlAddRecipe(recipe);
    jest.runAllTimers();
    await asyncResult;
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render error message when uploadRecipe throws', async () => {
    let controller;
    let model;
    const recipe = testHelper.getRecipe(true);
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.recipe = recipe;
      model.state.bookmarks = [];
      controller = await import('../js/controller');
    });
    jest.spyOn(model, 'uploadRecipe').mockImplementation(() => {
      throw new Error('This is a testing error');
    });
    await controller.controlAddRecipe(recipe);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});

describe('controller test controlEditUserRecipe', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should show the message No changes detected...', async () => {
    let controller;
    let model;
    const recipe = testHelper.getRecipe(true);
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
      model.state.recipe = recipe;
      controller = await import('../js/controller');
    });
    const editedRecipe = {
      title: "Geeno's Pizza",
      sourceUrl: 'testing pizza',
      image:
        'https://lh3.googleusercontent.com/contacts/ADUEL1zXFUFdDiDykRFdlm2xMc_YCuQqT-tHCH67z26v7LoZlc2Yfjdq',
      publisher: 'Geeno',
      cookingTime: '5',
      servings: '1',
      'ingredient-1': '1,,Dog',
      'ingredient-2': ',,salt',
      'ingredient-3': '',
      'ingredient-4': '',
      'ingredient-5': '',
      'ingredient-6': '',
    };
    await controller.controlEditUserRecipe(editedRecipe);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render the updated recipe', async () => {
    let controller;
    let model;
    let netlifyFunctions;
    const recipe = testHelper.getRecipe(true);
    const netlifyRecipe = testHelper.netlifyLoadReceipeResult();
    const nutritionWdigetContent = testHelper.nutritionWdigetContent();
    await jest.isolateModulesAsync(async () => {
      netlifyFunctions = await import('../js/netlifyFunctions');
      model = await import('../js/model');
      model.state.recipe = recipe;
      model.state.bookmarks = [];
      controller = await import('../js/controller');
    });
    jest.spyOn(netlifyFunctions, 'deleteRecipe').mockImplementation(() => []);
    netlifyRecipe.data.recipe.ingredients.push({
      quantity: null,
      unit: '',
      description: 'apple',
    });
    jest
      .spyOn(netlifyFunctions, 'uploadRecipe')
      .mockImplementation(() => netlifyRecipe);
    jest
      .spyOn(model, 'getNutritionWidget')
      .mockImplementation(() => nutritionWdigetContent);
    const editedRecipe = {
      title: "Geeno's Pizza",
      sourceUrl: 'testing pizza',
      image:
        'https://lh3.googleusercontent.com/contacts/ADUEL1zXFUFdDiDykRFdlm2xMc_YCuQqT-tHCH67z26v7LoZlc2Yfjdq',
      publisher: 'Geeno',
      cookingTime: '5',
      servings: '1',
      'ingredient-1': '1,,Dog',
      'ingredient-2': ',,salt',
      'ingredient-3': ',,apple',
      'ingredient-4': '',
      'ingredient-5': '',
      'ingredient-6': '',
    };
    await controller.controlEditUserRecipe(editedRecipe);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});
