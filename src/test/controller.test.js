/**
 * @jest-environment jsdom
 */
import { async } from 'regenerator-runtime';
import * as testHelper from './testHelper';

const html = testHelper.indexHTMLContent().toString();
process.env['NODE_DEV'] = 'TEST-112233';

async function getController() {
  let controllerM;
  await jest.isolateModulesAsync(async () => {
    controllerM = await import('../js/controller');
  });
  return controllerM.default;
}
describe('controller test controlRecipes', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should not call any views', async () => {
    const controller = await getController();
    await controller.controlRecipes();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render correctly', async () => {
    window.location.hash = '#' + testHelper.getNonBookmarkedRecipeId();
    const mockSearchRecipesResults = testHelper.searchRecipesResults();
    const mockGetNutritionWidget = jest
      .fn()
      .mockImplementation(testHelper.nutritionWdigetContent());
    const mockBookmarks = testHelper.bookmarkedRecipes();
    const mockRecipe = testHelper.getRecipe();
    jest.mock('../js/model', () => {
      const originalModule = jest.requireActual('../js/model');
      return {
        __esModule: true,
        ...originalModule,
        loadRecipe: jest.fn().mockImplementation(() => Promise.resolve('test')),
        getNutritionWidget: mockGetNutritionWidget,
        state: {
          bookmarks: mockBookmarks,
          recipe: mockRecipe,
          search: {
            results: mockSearchRecipesResults,
            page: 23,
          },
        },
      };
    });
    const controller = await getController();
    await controller.controlRecipes();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});
