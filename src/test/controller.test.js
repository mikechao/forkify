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

  it('should the test recipe render correctly', async () => {
    window.location.hash = '#' + testHelper.getNonBookmarkedRecipeId();
    const mockModel = {
      getSearchResultsPage: jest.fn(() => []),
      loadRecipe: jest.fn(() => []),
      getNutritionWidget: jest.fn(() => testHelper.nutritionWdigetContent()),
      state: {
        bookmarks: [],
        recipe: testHelper.getRecipe(),
      },
    };
    jest.mock('../js/model', () => mockModel);
    const controller = await getController();
    await controller.controlRecipes();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render the error message correctly when the id does not exist', async () => {
    window.location.hash = '#123456789';
    const mockModel = {
      getSearchResultsPage: jest.fn(() => []),
      loadRecipe: jest.fn().mockRejectedValue(new Error('Testings error')),
      getNutritionWidget: jest.fn(() => testHelper.nutritionWdigetContent()),
      state: {
        bookmarks: [],
        recipe: testHelper.getRecipe(),
      },
    };
    jest.mock('../js/model', () => mockModel);
    const controller = await getController();
    await controller.controlRecipes();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});
