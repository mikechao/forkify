/**
 * @jest-environment jsdom
 */
import * as testHelper from '../testHelper';
import { showEditWindow } from '../../js/views/addRecipeView';
import {
  addHandlerDeleteUserRecipe,
  show,
} from '../../js/views/deleteModalView';

const fs = require('fs');
const path = require('path');
const { async } = require('regenerator-runtime');
const html = fs.readFileSync(
  path.resolve(__dirname, '../../../index.html'),
  'utf8'
);

jest.dontMock('fs');

const mockShowEditWindow = jest.fn();
jest.mock('../../js/views/addRecipeView', () => ({
  showEditWindow: mockShowEditWindow,
}));

const mockAddHandlerDelete = jest.fn();
const mockShowDeleteModal = jest.fn();
jest.mock('../../js/views/deleteModalView', () => ({
  show: mockShowDeleteModal,
  addHandlerDeleteUserRecipe: mockAddHandlerDelete,
}));

describe('recipeView test', () => {
  let recipeView;
  beforeEach(async () => {
    document.documentElement.innerHTML = html.toString();
    let recipeViewM;
    await jest.isolateModulesAsync(async () => {
      recipeViewM = await import('../../js/views/recipeView');
    });
    recipeView = recipeViewM.default;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should render the starting view correctly', () => {
    recipeView.renderStartingView();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should delegate the delete user recipe handler to the deleteModalView', () => {
    const handler = jest.fn();
    recipeView.addHandlerDeleteUserRecipe(handler);
    expect(mockAddHandlerDelete).toHaveBeenCalled();
    expect(mockAddHandlerDelete).toHaveBeenCalledWith(handler);
  });

  it('should call the handler on hashchange and load events', () => {
    const handler = jest.fn();
    recipeView.addHandlerRender(handler);
    window.dispatchEvent(new Event('hashchange'));
    expect(handler).toHaveBeenCalledTimes(1);
    window.dispatchEvent(new Event('load'));
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('should render a recipe correctly', () => {
    const recipe = testHelper.getRecipe();
    recipeView.render(recipe);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should update a recipe correctly after removing bookmark', () => {
    const recipe = testHelper.getRecipe();
    recipeView.render(recipe);
    delete recipe.bookmark;
    recipeView.update(recipe);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should call the bookmark handler after rendering a recipe and bookmark button clicked', () => {
    const handler = jest.fn();
    recipeView.addHandlerAddBookmark(handler);
    const recipe = testHelper.getRecipe();
    recipeView.render(recipe);
    const bookmarkBtn = document.querySelector('.btn--bookmark');
    bookmarkBtn.click();
    expect(handler).toHaveBeenCalled();
  });

  it('should call deleteModalView.show after rendering a recipe and delete button is clicked', () => {
    const recipe = testHelper.getRecipe();
    recipeView.render(recipe);
    const deleteBtn = document.querySelector('.btn--delete');
    deleteBtn.click();
    expect(mockShowDeleteModal).toHaveBeenCalled();
  });

  it('should call addRecipeView.showEditWindow after rendering a recipe and edit button is clicked', () => {
    const recipe = testHelper.getRecipe();
    recipeView.render(recipe);
    const editBtn = document.querySelector('.btn--edit');
    editBtn.click();
    expect(mockShowEditWindow).toHaveBeenCalled();
  });

  it('should call the handler after showing recipe and clicking plus than minus servings', () => {
    const recipe = testHelper.getRecipe();
    recipeView.render(recipe);
    const handler = jest.fn();
    recipeView.addHandlerUpdateServings(handler);
    const minusServingsBtn = document.querySelector(
      '.btn--update-servings-minus'
    );
    minusServingsBtn.click();
    expect(handler).not.toHaveBeenCalled();

    const plusServingsBtn = document.querySelector(
      '.btn--update-servings-plus'
    );
    plusServingsBtn.click();
    expect(handler).toHaveBeenCalled();
  });
});
