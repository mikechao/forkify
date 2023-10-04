import { async } from 'regenerator-runtime';
import {
  loadRecipe,
  searchRecipes,
  uploadRecipe,
  deleteRecipe,
} from '../js/netlifyFunctions';

jest.mock('../js/netlifyFunctions', () => ({
  __esModule: true, // this property makes it work
  loadRecipe: jest.fn(),
  searchRecipes: jest.fn(),
  uploadRecipe: jest.fn(),
  deleteRecipe: jest.fn(),
}));

function getBookmarkedRecipeId() {
  return '65147903622c9a0014492004';
}

function getNonBookmarkedRecipeId() {
  return '3411342532253245ad24';
}

function getRecipe(bookmarked = true) {
  return {
    id: bookmarked ? getBookmarkedRecipeId() : getNonBookmarkedRecipeId(),
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
    ...(bookmarked && { bookmark: true }),
  };
}

function mockLocalStorage(includeBookmarked = true) {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
  if (includeBookmarked)
    localStorageMock.getItem.mockImplementation(() => {
      return JSON.stringify([getRecipe()]);
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
        id: bookmarked ? getBookmarkedRecipeId() : getNonBookmarkedRecipeId(),
      },
    },
  };
}

function searchRecipesResults() {
  return {
    status: 'success',
    results: 3,
    data: {
      recipes: [
        {
          publisher: 'BBC Food',
          image_url:
            'http://forkify-api.herokuapp.com/images/theultimatemasalatea_86647_16x92aa7.jpg',
          title: 'The ultimate masala tea',
          id: '5ed6604591c37cdc054bcf99',
        },
        {
          publisher: 'Steamy Kitchen',
          image_url:
            'http://forkify-api.herokuapp.com/images/chinese_tea_egg1200x1502f10.jpg',
          title: 'Chinese Marbled Tea Egg Recipe',
          id: '5ed6604591c37cdc054bcd54',
        },
        {
          publisher: 'Pastry Affair',
          image_url:
            'http://forkify-api.herokuapp.com/images/8490340733_91c07b6f0c_b149f.jpg',
          title:
            'Black Tea Cake with Honey&nbsp;Buttercream - Home - Pastry Affair',
          id: '5ed6604591c37cdc054bcf9c',
        },
      ],
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
    await model.loadRecipe(getBookmarkedRecipeId());
    expect(model.state.recipe.bookmarked).toBe(true);
  });

  test('Test load recipe with non bookmarked id', async () => {
    loadRecipe.mockImplementation(() => loadedRecipeData(false));
    await model.loadRecipe(getNonBookmarkedRecipeId());
    expect(model.state.recipe.bookmarked).toBe(false);
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
    searchRecipes.mockImplementation(() => searchRecipesResults());
    await model.loadSearchResults('tea');
    expect(model.state.search.query).toBe('tea');
    expect(model.state.search.results.length).toBe(3);
    expect(model.state.search.page).toBe(1);

    const values = model.getSearchResultsPage();
    expect(values.length).toBe(3);
    expect(model.state.search.page).toBe(1);
  });

  test('addBookmark then deleteBookmark', () => {
    const recipe = getRecipe(false);
    model.addBookmark(recipe);
    expect(model.state.bookmarks.length).toBe(1);
    expect(localStorageMock.setItem).toHaveBeenCalled();

    // prettier-ignore
    const stringfiy = "[{\"id\":\"3411342532253245ad24\",\"title\":\"Geeno's Pizza\",\"publisher\":\"Geeno\",\"sourceUrl\":\"testing pizza\",\"image\":\"https://lh3.googleusercontent.com/contacts/ADUEL1zXFUFdDiDykRFdlm2xMc_YCuQqT-tHCH67z26v7LoZlc2Yfjdq\",\"servings\":1,\"cookingTime\":5,\"ingredients\":[{\"quantity\":1,\"unit\":\"\",\"description\":\"Dog\"},{\"quantity\":null,\"unit\":\"\",\"description\":\"salt\"}],\"key\":\"0fe58a46-944a-41f2-b3c8-5b6458414195\"}]"
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'bookmarks',
      stringfiy
    );

    model.deleteBookmark(getNonBookmarkedRecipeId());
    expect(model.state.bookmarks.length).toBe(0);
    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('bookmarks', '[]');
  });

  test('updateServings', () => {
    model.state.recipe = getRecipe();
    model.updateServings(4);
    expect(model.state.recipe.servings).toBe(4);
    expect(model.state.recipe.ingredients[0].quantity).toBe(4);
    expect(model.state.recipe.ingredients[1].quantity).toBe(0);
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

    deleteRecipe.mockImplementation(() => {});
    await model.deleteUserRecipe();
    expect(model.state.bookmarks.length).toBe(0);
    // after deleteUserRecipe model.state.recipe should be and empty object therefore no keys
    expect(Object.keys(model.state.recipe).length).toBe(0);
  });
});
