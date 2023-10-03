import { async } from 'regenerator-runtime';
import { loadRecipe } from '../js/netlifyFunctions';

jest.mock('../js/netlifyFunctions', () => ({
  __esModule: true, // this property makes it work
  loadRecipe: jest.fn(),
}));

function getBookmarkedRecipeId() {
  return '65147903622c9a0014492004';
}

function getNonBookmarkedRecipeId() {
  return '3411342532253245ad24';
}

function mockLocalStorage() {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
  localStorageMock.getItem.mockImplementation(() => {
    return JSON.stringify([
      {
        id: getBookmarkedRecipeId(),
        title: "Geeno's Pizza",
        publisher: 'Geeno',
        sourceUrl: 'testing pizza',
        image:
          'https://lh3.googleusercontent.com/contacts/ADUEL1zXFUFdDiDykRFdlm2xMc_YCuQqT-tHCH67z26v7LoZlc2Yfjdq',
        servings: 1,
        cookingTime: 5,
        ingredients: [
          { quantity: 1, unit: '', description: 'Dog' },
          { quantity: null, unit: '', description: 'salt' },
        ],
        key: '0fe58a46-944a-41f2-b3c8-5b6458414195',
        bookmarked: true,
      },
    ]);
  });
  return localStorageMock;
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
        id: bookmarked ? getBookmarkedRecipeId() : getNonBookmarkedRecipeId(),
      },
    },
  };
}

describe('Testing loadRecipe', () => {
  let model;
  let localStorageMock;
  beforeAll(async () => {
    localStorageMock = mockLocalStorage();
    global.localStorage = localStorageMock;
    model = await import('../js/model');
  });
  beforeEach(() => {
    // Storage.prototype.getItem = jest.fn();
  });
  afterEach(() => {
    loadRecipe.mockRestore();
  });
  //   const model = import('../js/model');
  test('model init function, load bookmarks from localstorage', () => {
    // loadRecipe.mockImplementation(() => 'Mocked!!');
    expect(model.state.bookmarks.length).toBe(1);
    expect(localStorageMock.getItem).toHaveBeenCalled();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('bookmarks');
  });

  test('Test load recipe with bookmarked id', async () => {
    loadRecipe.mockImplementation(() => loadedRecipeData());
    await model.loadRecipe(getBookmarkedRecipeId());
    expect(model.state.recipe.bookmarked).toBe(true);
  });

  test('Test load recipe with non bookmarked id', async () => {
    loadRecipe.mockImplementation(() => loadedRecipeData(false));
    await model.loadRecipe(getNonBookmarkedRecipeId());
    expect(model.state.recipe.bookmarked).toBe(false);
  });
});
