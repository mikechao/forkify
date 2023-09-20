/**
 * The JSON structor of an edited recipe from the ui
 *
 * @typedef {object} EditedRecipe
 * @property {string} title
 * @property {string} sourceUrl
 * @property {string} image
 * @property {string} publisher
 * @property {string} cookingTime
 * @property {string} servings
 * @property {string} ingredient-1
 * @property {string} ingredient-2
 * @property {string} ingredient-3
 * @property {string} ingredient-4
 * @property {string} ingredient-5
 * @property {string} ingredient-6
 */

/** @typedef {object} Recipe
 * @property {string} title
 * @property {string} sourceUrl
 * @property {string} image
 * @property {string} publisher
 * @property {number} cookingTime
 * @property {number} servings
 * @property {object[]} ingredients
 * @property {number} ingredients.quantity
 * @property {string} ingredients.unit
 * @property {string} ingredients.description
 */

/**
 * Converts the edited recipe from the ui to the same as the one used in model.js
 * @param {EditedRecipe} editedRecipe
 * @returns {Recipe} The recipe object in the form that is used in model.js
 */
export const CONVERT_EDITED_RECIPE = function (editedRecipe) {
  const ingredients = Object.entries(editedRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
      const ingArr = ing[1].split(',').map(el => el.trim());
      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });
  const recipe = {
    title: editedRecipe.title,
    sourceUrl: editedRecipe.sourceUrl,
    image: editedRecipe.image,
    publisher: editedRecipe.publisher,
    cookingTime: +editedRecipe.cookingTime,
    servings: +editedRecipe.servings,
    ingredients,
  };
  return recipe;
};

/**
 * Compares the 2 recipe objects skipping key, id, and bookmarked
 * @param {*} recipe
 * @param {*} otherRecipe
 * @returns
 */
export const IS_RECIPES_EQUAL = function (recipe, otherRecipe) {
  if (recipe.title !== otherRecipe.title) return false;
  if (recipe.sourceUrl !== otherRecipe.sourceUrl) return false;
  if (recipe.image !== otherRecipe.image) return false;
  if (recipe.publisher !== otherRecipe.publisher) return false;
  if (recipe.cookingTime !== otherRecipe.cookingTime) return false;
  if (recipe.servings !== otherRecipe.servings) return false;
  if (recipe.ingredients.length !== otherRecipe.ingredients.length)
    return false;
  return recipe.ingredients.every((ing, index) => {
    if (otherRecipe.ingredients[index].quantity !== ing.quantity) return false;
    if (otherRecipe.ingredients[index].unit !== ing.unit) return false;
    if (otherRecipe.ingredients[index].description !== ing.description)
      return false;
    return true;
  });
};
