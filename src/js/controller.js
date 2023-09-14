import { async } from 'regenerator-runtime';
import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //0 Update results view to mark select search result
    resultsView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);
    // 1 loading
    await model.loadRecipe(id);
    const widget = await model.getNutritionWidget(model.state.recipe);
    // 2 Rendering recipe
    recipeView.render(model.state.recipe);
    recipeView.renderNutritionWidget(widget);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    // 1 Get Search Query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    // 2 Load search results
    await model.loadSearchResults(query);

    // 3 Render results
    resultsView.render(model.getSearchResultsPage());

    // 4 Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1 Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2 Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlDeleteUserRecipe = async function () {
  try {
    if (!model.state.recipe.key) return;
    await model.deleteUserRecipe();

    // restore the recipe view to start
    recipeView.renderStartingView();

    // update the bookmarks view since user recipe is deleted
    bookmarksView.render(model.state.bookmarks);

    // remove the hash from the url
    window.history.replaceState('', document.title, window.location.pathname);

    const returnVal = {
      status: true,
      message: '',
    };
    if (model.state.search.results.length === 0) return returnVal;
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);

    return returnVal;
  } catch (err) {
    console.error(err);
    return {
      status: false,
      message: err.message,
    };
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    const widget = await model.getNutritionWidget(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);
    recipeView.renderNutritionWidget(widget);

    // Success message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.closeWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('🤷‍♀️🤦‍♂️', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHanlderRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerDeleteUserRecipe(controlDeleteUserRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
