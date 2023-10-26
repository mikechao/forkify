/**
 * @jest-environment jsdom
 */
import * as testHelper from '../testHelper';
const html = testHelper.indexHTMLContent().toString();

describe('addRecipeView test', () => {
  let addRecipeView;
  beforeEach(async () => {
    document.documentElement.innerHTML = html;
    let addRecipeViewM;
    await jest.isolateModulesAsync(async () => {
      addRecipeViewM = await import('../../js/views/addRecipeView');
    });
    addRecipeView = addRecipeViewM.default;
  });

  it('should render the add recipe view correctly when the open button then close button is clicked', () => {
    const openBtn = document.querySelector('.nav__btn--add-recipe');
    openBtn.click();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
    const closeBtn = document.querySelector('.btn--close-modal');
    closeBtn.click();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should show editing a recipe correctly and the editHandler is called when form is submitted', () => {
    const recipe = testHelper.getRecipe();
    recipe.ingredients.push({ quantity: 1, unit: null, description: null });
    const addHandler = jest.fn();
    const editHandler = jest.fn();
    addRecipeView.addHandlerUpload(addHandler, editHandler);
    addRecipeView.showEditWindow(recipe);
    expect(document.documentElement.innerHTML).toMatchSnapshot();

    const form = document.querySelector('.upload');
    form.requestSubmit();
    expect(editHandler).toHaveBeenCalled();
    expect(addHandler).not.toHaveBeenCalled();
  });

  it('should call the addHandler when a valid recipe is added', () => {
    const addHandler = jest.fn();
    const editHandler = jest.fn();
    addRecipeView.addHandlerUpload(addHandler, editHandler);

    addRecipeView.showWindow();
    const form = document.querySelector('.upload');
    form.requestSubmit();
    form.requestSubmit();

    expect(editHandler).not.toHaveBeenCalled();
    expect(addHandler).toHaveBeenCalled();
  });

  it('should render success message correctly, then open window and render correctly again', () => {
    addRecipeView.renderMessage();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
    addRecipeView.showWindow();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render error message correctly', () => {
    addRecipeView.renderError('Test error message');
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render default error message correctly', () => {
    addRecipeView.renderError();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should not call any handler with invalid recipe', () => {
    const recipe = testHelper.getRecipe();
    recipe.title = '';
    const addHandler = jest.fn();
    const editHandler = jest.fn();
    addRecipeView.addHandlerUpload(addHandler, editHandler);
    addRecipeView.showEditWindow(recipe);

    const form = document.querySelector('.upload');
    form.submit();
    expect(editHandler).not.toHaveBeenCalled();
    expect(addHandler).not.toHaveBeenCalled();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render add and remove ingredient correctly', () => {
    const addBtn = document.querySelector('.btn--add-ing');
    const removeBtn = document.querySelector('.btn--remove-ing');
    addRecipeView.showWindow();

    // 3 ingredients
    addBtn.click();
    expect(document.documentElement.innerHTML).toMatchSnapshot();

    addBtn.click(); // 4 ingredients
    addBtn.click(); // 5 ingredients
    addBtn.click(); // 6 ingredients
    addBtn.click(); // 7 ingredients
    expect(document.documentElement.innerHTML).toMatchSnapshot();

    removeBtn.click(); // 6 ingredients
    removeBtn.click(); // 5 ingredients
    removeBtn.click(); // 4 ingredients
    removeBtn.click(); // 3 ingredients
    removeBtn.click(); // 2 ingredients
    removeBtn.click(); // shoul still be 2 ingredients
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render the ingredient validation message when ingredient is not valid', () => {
    const recipe = testHelper.getRecipe();
    addRecipeView.showEditWindow(recipe);

    const ingredientInput2 = document.querySelector('[name="ingredient-2"]');
    ingredientInput2.defaultValue = 'invalid ingredient format';

    const addBtn = document.querySelector('.btn--add-ing');
    addBtn.click(); // ingredient 3
    addBtn.click(); // ingredient 4
    addBtn.click(); // ingredient 5
    addBtn.click(); // ingredient 6
    addBtn.click(); // ingredient 7

    const ingredientInput7 = document.querySelector('[name="ingredient-7"]');
    ingredientInput7.defaultValue = 'another invalid ingredient';

    ingredientInput2.focus();
    ingredientInput2.blur();

    ingredientInput7.focus();
    ingredientInput7.blur();

    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should show the edited recipe then the normal add recipe correctly', () => {
    const recipe = testHelper.getRecipe();
    addRecipeView.showEditWindow(recipe);

    addRecipeView.showWindow();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should return nothing from generateMarkUp', () => {
    const result = addRecipeView._generateMarkup();
    expect(result).toBeUndefined();
  });
});
