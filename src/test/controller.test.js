/**
 * @jest-environment jsdom
 */
import { async } from 'regenerator-runtime';
import * as testHelper from './testHelper';

const html = testHelper.indexHTMLContent().toString();
process.env['NODE_DEV'] = 'TEST-112233';

describe('controller test controlRecipes', () => {
  beforeAll(() => {});

  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
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
});
