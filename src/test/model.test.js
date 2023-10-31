import { async } from 'regenerator-runtime';
import {
  loadRecipe,
  searchRecipes,
  uploadRecipe,
  deleteRecipe,
  getNutritionWidget,
} from '../js/netlifyFunctions';
import * as testHelper from './testHelper';

jest.mock('../js/netlifyFunctions', () => ({
  __esModule: true, // this property makes it work
  loadRecipe: jest.fn(),
  searchRecipes: jest.fn(),
  uploadRecipe: jest.fn(),
  deleteRecipe: jest.fn(),
  getNutritionWidget: jest.fn(),
}));

function mockLocalStorage(includeBookmarked = true) {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
  if (includeBookmarked)
    localStorageMock.getItem.mockImplementation(() => {
      return JSON.stringify([testHelper.getRecipe()]);
    });
  return localStorageMock;
}

function restoreLocalMockStorage(localStorageMock) {
  localStorageMock.getItem.mockRestore();
  localStorageMock.setItem.mockRestore();
  localStorageMock.clear.mockRestore();
}

/**
 *
 * @returns data returned from the server with an id that matches the one from mockLocalStorage
 */
function loadedRecipeData(bookmarked = true) {
  return {
    status: 'success',
    data: {
      recipe: {
        title: "Geeno's Pizza",
        source_url: 'testing pizza',
        image_url:
          'https://lh3.googleusercontent.com/contacts/ADUEL1zXFUFdDiDykRFdlm2xMc_YCuQqT-tHCH67z26v7LoZlc2Yfjdq',
        publisher: 'Geeno',
        cooking_time: 5,
        servings: 1,
        ingredients: [
          {
            quantity: 1,
            unit: '',
            description: 'Dog',
          },
          {
            quantity: null,
            unit: '',
            description: 'salt',
          },
        ],
        key: '0fe58a46-944a-41f2-b3c8-5b6458414195',
        id: bookmarked
          ? testHelper.getBookmarkedRecipeId()
          : testHelper.getNonBookmarkedRecipeId(),
      },
    },
  };
}

function uploadedRecipeResults() {
  return {
    status: 'success',
    data: {
      recipe: {
        createdAt: '2023-10-03T21:53:46.793Z',
        title: "James's Pizza",
        source_url: 'http://james.com',
        image_url: 'http://james.com',
        publisher: 'James',
        cooking_time: 4,
        servings: 1,
        ingredients: [
          {
            quantity: 1,
            unit: '',
            description: 'Cat',
          },
          {
            quantity: 1,
            unit: 'bag',
            description: 'orange fur',
          },
          {
            quantity: null,
            unit: '',
            description: 'nails',
          },
        ],
        key: '0fe58a46-944a-41f2-b3c8-5b6458414195',
        id: '651ddad373368200146f3dd9',
      },
    },
  };
}

describe('Testing model with bookmarked recipe in localstorage', () => {
  let model;
  let localStorageMock;
  beforeAll(async () => {
    localStorageMock = mockLocalStorage();
    global.localStorage = localStorageMock;
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
    });
  });
  beforeEach(() => {
    // Storage.prototype.getItem = jest.fn();
  });
  afterEach(() => {
    loadRecipe.mockRestore();
    restoreLocalMockStorage(localStorageMock);
  });

  test('model init function, load bookmarks from localstorage', () => {
    expect(model.state.bookmarks.length).toBe(1);
    expect(localStorageMock.getItem).toHaveBeenCalled();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('bookmarks');
  });

  test('Test load recipe with bookmarked id', async () => {
    loadRecipe.mockImplementation(() => loadedRecipeData());
    await model.loadRecipe(testHelper.getBookmarkedRecipeId());
    expect(model.state.recipe.bookmarked).toBe(true);
  });

  test('Test load recipe with non bookmarked id', async () => {
    loadRecipe.mockImplementation(() => loadedRecipeData(false));
    await model.loadRecipe(testHelper.getNonBookmarkedRecipeId());
    expect(model.state.recipe.bookmarked).toBe(false);
  });

  test('netlifyFuntions.loadRecipe throws error, model should too', () => {
    const message = 'This is a testing error';
    loadRecipe.mockImplementation(() => {
      throw new Error(message);
    });
    expect(async () => {
      await model.loadRecipe('12345');
    }).rejects.toThrow(message);
  });
});

describe('Testing model with empty localstorage', () => {
  let model;
  let localStorageMock;
  beforeAll(async () => {
    localStorageMock = mockLocalStorage(false);
    global.localStorage = localStorageMock;
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
    });
  });
  afterEach(() => {
    searchRecipes.mockRestore();
    restoreLocalMockStorage(localStorageMock);
  });

  test('model init with empty localstorage', () => {
    expect(model.state.bookmarks.length).toBe(0);
    expect(localStorageMock.getItem).toHaveBeenCalled();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('bookmarks');
  });

  test('loadSearchResults with results', async () => {
    searchRecipes.mockImplementation(() => testHelper.searchRecipesResults());
    await model.loadSearchResults('tea');
    expect(model.state.search.query).toBe('tea');
    expect(model.state.search.results.length).toBe(3);
    expect(model.state.search.page).toBe(1);

    const values = model.getSearchResultsPage();
    expect(values.length).toBe(3);
    expect(model.state.search.page).toBe(1);
  });

  test('clearBookmarks', () => {
    model.clearBookmarks();
    expect(localStorageMock.clear).toHaveBeenCalled();
    expect(localStorageMock.clear).toHaveBeenCalledWith('bookmarks');
  });

  test('netlifyFuntions.searchReipes throws error, model should too', () => {
    const message = 'This is a testing error';
    searchRecipes.mockImplementation(() => {
      throw new Error(message);
    });

    expect(async () => {
      await model.loadSearchResults('apple');
    }).rejects.toThrow(message);
  });

  test('addBookmark then deleteBookmark', () => {
    const recipe = testHelper.getRecipe(false);
    model.addBookmark(recipe);
    expect(model.state.bookmarks.length).toBe(1);
    expect(localStorageMock.setItem).toHaveBeenCalled();

    // prettier-ignore
    const stringfiy = "[{\"id\":\"3411342532253245ad24\",\"title\":\"Geeno's Pizza\",\"publisher\":\"Geeno\",\"sourceUrl\":\"testing pizza\",\"image\":\"https://lh3.googleusercontent.com/contacts/ADUEL1zXFUFdDiDykRFdlm2xMc_YCuQqT-tHCH67z26v7LoZlc2Yfjdq\",\"servings\":1,\"cookingTime\":5,\"ingredients\":[{\"quantity\":1,\"unit\":\"\",\"description\":\"Dog\"},{\"quantity\":null,\"unit\":\"\",\"description\":\"salt\"}],\"key\":\"0fe58a46-944a-41f2-b3c8-5b6458414195\"}]"
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'bookmarks',
      stringfiy
    );

    model.deleteBookmark(testHelper.getNonBookmarkedRecipeId());
    expect(model.state.bookmarks.length).toBe(0);
    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('bookmarks', '[]');
  });

  test('updateServings', () => {
    model.state.recipe = testHelper.getRecipe();
    model.updateServings(4);
    expect(model.state.recipe.servings).toBe(4);
    expect(model.state.recipe.ingredients[0].quantity).toBe(4);
    expect(model.state.recipe.ingredients[1].quantity).toBe(0);
  });

  test('getNutirtionWidget', async () => {
    // the spoonacular api returns around 22.9kb of html, not going to repeat that here

    getNutritionWidget.mockImplementation(() => 'bunch of html');
    const recipe = testHelper.getRecipe();
    recipe.ingredients.push({
      quantity: 1,
      unit: 'oz',
      description: 'butter',
    });
    await model.getNutritionWidget(recipe);
    expect(getNutritionWidget).toHaveBeenCalled();
    expect(getNutritionWidget.mock.lastCall.length).toBe(1);
    const args = getNutritionWidget.mock.lastCall[0];
    expect(args).toBe(recipe);
  });

  test('getNutirtionWidget api throws error, model should throw it too', () => {
    const errorMessage = 'This is a testing error';
    getNutritionWidget.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const recipe = testHelper.getRecipe();
    expect(async () => {
      await model.getNutritionWidget(recipe);
    }).rejects.toThrow(errorMessage);
  });
});

describe('Test uploadRecipe then deleteUserRecipe', () => {
  let model;
  let localStorageMock;
  beforeAll(async () => {
    localStorageMock = mockLocalStorage(false);
    global.localStorage = localStorageMock;
    await jest.isolateModulesAsync(async () => {
      model = await import('../js/model');
    });
  });
  afterEach(() => {
    uploadRecipe.mockRestore();
    deleteRecipe.mockRestore();
    restoreLocalMockStorage(localStorageMock);
  });

  test('uploadRecipe then deleteUserRecipe', async () => {
    const recipe = {
      title: "James's Pizza",
      sourceUrl: 'http://james.com',
      image: 'http://james.com',
      publisher: 'James',
      cookingTime: '4',
      servings: '1',
      'ingredient-1': '1,,Cat',
      'ingredient-2': '1,bag,orange fur',
      'ingredient-3': ',,nails',
      'ingredient-4': '',
      'ingredient-5': '',
      'ingredient-6': '',
    };
    uploadRecipe.mockImplementation(() => uploadedRecipeResults());
    await model.uploadRecipe(recipe);
    expect(model.state.recipe.title).toBe("James's Pizza");
    expect(model.state.recipe.ingredients.length).toBe(3);
    expect(model.state.recipe.bookmarked).toBe(true);
    expect(model.state.bookmarks.length).toBe(1);

    model.state.search.results.push({
      publisher: 'James',
      image_url: 'http://james.com',
      title: "James's Pizza",
      id: '651ddad373368200146f3dd9',
    });
    deleteRecipe.mockImplementation(() => {});
    await model.deleteUserRecipe();
    expect(model.state.bookmarks.length).toBe(0);
    // after deleteUserRecipe model.state.recipe should be and empty object therefore no keys
    expect(Object.keys(model.state.recipe).length).toBe(0);
    expect(model.state.search.results.length).toBe(0);
  });

  it('should throw error when netlifyFuntions.deleteRecipe throws error', () => {
    const recipe = testHelper.getRecipe();
    model.state.recipe = recipe;
    const message = 'This is a testing error';
    deleteRecipe.mockImplementation(() => {
      throw new Error(message);
    });
    expect(async () => {
      await model.deleteUserRecipe();
    }).rejects.toThrow(message);
  });

  it('should throw error when netlifyFuntions.uploadREcipe throws error', () => {
    const recipe = {
      title: "James's Pizza",
      sourceUrl: 'http://james.com',
      image: 'http://james.com',
      publisher: 'James',
      cookingTime: '4',
      servings: '1',
      'ingredient-1': '1,,Cat',
      'ingredient-2': '1,bag,orange fur',
      'ingredient-3': ',,nails',
      'ingredient-4': '',
      'ingredient-5': '',
      'ingredient-6': '',
    };

    const message = 'This is a testing error';
    uploadRecipe.mockImplementation(() => {
      throw new Error(message);
    });

    expect(async () => {
      await model.uploadRecipe(recipe);
    }).rejects.toThrow(message);
  });
});
