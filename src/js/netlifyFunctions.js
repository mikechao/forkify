import { async } from 'regenerator-runtime';

const baseURL = `/.netlify/functions/`;

/**
 * The JSON structor of a recipe loaded by id
 * @typedef {object} LoadedRecipe
 * @property {string} status
 * @property {object} data
 * @property {object} data.recipe
 * @property {string} data.recipe.title
 * @property {string} data.recipe.source_url
 * @property {string} data.recipe.image_url
 * @property {string} data.recipe.publisher
 * @property {number} data.recipe.cooking_time
 * @property {number} data.recipe.servings
 * @property {object[]} data.recipe.ingredients
 * @property {number} data.recipe.ingredients.quantity
 * @property {string} data.recipe.ingredients.unit
 * @property {string} data.recipe.ingredients.description
 * @property {string} data.recipe.key
 * @property {string} data.recipe.id
 */

/**
 * Loads a recipe based on the id passed in. Delegates to netlify/functions/getRecipe.js (serverless function) to do the web api call.
 * @param {string} id - The id of the recipe to load
 * @returns {Promise<LoadedRecipe>} The loaded recipe
 */
export const loadRecipe = async function (id) {
  try {
    const apiURL = `${baseURL}getRecipe?id=${id}`;
    const res = await fetch(apiURL, {
      method: 'GET',
      headers: { accept: 'application/json' },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * Deletes a recipe based on the id. Delegates to serverless function in netlify/functions/deleteRecipe.js to handle the web api call.
 * @param {string} id - Representing the id of the recipe to delete
 */
export const deleteRecipe = async function (id) {
  try {
    const apiURL = `${baseURL}deleteRecipe?id=${id}`;
    await fetch(apiURL, {
      method: 'DELETE',
    });
  } catch (err) {
    throw err;
  }
};

/**
 * @typedef {object} SearchResults
 * @property {string} status - The status of web api call
 * @property {number} results - The number of results
 * @property {object} data - The returned data of web api call
 * @property {object[]} data.recipes - Recipes that match the query
 * @property {string} data.recipes.title
 * @property {string} data.recipes.image_url
 * @property {string} data.recipes.publisher
 * @property {string} data.recipes.key
 * @property {string} data.recipes.id
 */

/**
 * Searches for recipes that match the query. Delegates to serverless function netlify/functions/searchRecipes to handle web api call.
 * @param {string} query
 * @returns {Promise<SearchResults>} The search results with an array of recipe previews
 */
export const searchRecipes = async function (query) {
  try {
    const apiURL = `${baseURL}searchRecipes?query=${query}`;
    const res = await fetch(apiURL, {
      method: 'GET',
      headers: { accept: 'application/json' },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

/** @typedef {object} RecipeUpload
 * @property {string} title
 * @property {string} source_url
 * @property {string} image_url
 * @property {string} publisher
 * @property {number} cooking_time
 * @property {number} servings
 * @property {object[]} ingredients
 * @property {number|null} ingredients.quantity
 * @property {string} ingredients.unit
 * @property {string} ingredients.description
 */

/** @typedef {object} RecipeUploadReturn
 * @property {string} status
 * @property {object} data
 * @property {object} data.recipe
 * @property {string} data.recipe.createdAt
 * @property {string} data.recipe.title
 * @property {string} data.recipe.source_url
 * @property {string} data.recipe.image_url
 * @property {string} data.recipe.publisher
 * @property {number} data.recipe.cooking_time
 * @property {number} data.recipe.servings
 * @property {object[]} data.recipe.ingredients
 * @property {number|null} data.recipe.ingredients.quantity
 * @property {string} data.recipe.ingredients.unit
 * @property {string} data.recipe.ingredients.description
 * @property {string} data.recipe.key
 * @property {string} data.recipe.id
 */

/**
 * Uploads a recipe. Delegates to severless function in netlify/functions/uploadRecipe to handle web api call
 * @param {RecipeUpload} recipe  A valid recipe to upload
 * @returns {Promise<RecipeUploadReturn>} The uploaded recipe returned by the server with a new id assinged
 */
export const uploadRecipe = async function (recipe) {
  try {
    const apiURL = `${baseURL}uploadRecipe`;
    const res = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(recipe),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getNutritionWidget = async function (recipe) {
  try {
    const ings = recipe.ingredients
      .map(
        ing =>
          `${ing.quantity === null ? '' : ing.quantity} ${
            ing.unit === '' ? '' : ing.unit
          }  ${ing.description} `
      )
      .join('\n');
    const servings = recipe.servings;
    const apiURL = `${baseURL}getNutritionWidget?ings=${ings}&servings=${servings}`;
    const res = await fetch(apiURL, {
      method: 'POST',
    });
    const data = await res.text();
    return data;
  } catch (err) {
    throw err;
  }
};
