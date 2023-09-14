import { async } from 'regenerator-runtime';
import { RES_PER_PAGE, SPOON_API_URL, SPOON_API_KEY } from './config';
import { AJAX_SPOON_WIDGET } from './helpers';
import * as netlifyFunctions from './netlifyFunctions.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: !recipe.image_url.startsWith('https')
      ? recipe.image_url.replaceAll('http', 'https')
      : recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const getNutritionWidget = async function (recipe) {
  try {
    const ings = recipe.ingredients
      .map(
        ing =>
          `${ing.quantity === null ? '' : ing.quantity} ${
            ing.unit === '' ? '' : ing.unit
          }  ${ing.description}`
      )
      .join('\n');
    const data = await AJAX_SPOON_WIDGET(
      `${SPOON_API_URL}?apiKey=${SPOON_API_KEY}&showBacklink=true&defaultCss=true&servings=${recipe.servings}&ingredientList=${ings}`
    );
    return data;
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const loadRecipe = async function (id) {
  try {
    const data = await netlifyFunctions.loadRecipe(id);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const deleteUserRecipe = async function () {
  try {
    const id = state.recipe.id;
    await netlifyFunctions.deleteRecipe(id);
    deleteSearchResult(id);
    deleteBookmark(id);
    persistBookmarks();
    state.recipe = {};
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

const deleteSearchResult = function (id) {
  const index = state.search.results.findIndex(el => el.id === id);
  if (index < 0) return;
  state.search.results.splice(index, 1);
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await netlifyFunctions.searchRecipes(query);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: !rec.image_url.startsWith('https')
          ? rec.image_url.replaceAll('http', 'https')
          : rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  // mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await netlifyFunctions.uploadRecipe(recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
