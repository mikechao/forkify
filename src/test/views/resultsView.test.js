/**
 * @jest-environment jsdom
 */
import * as testHelper from '../testHelper';
const html = testHelper.indexHTMLContent().toString();

describe('resultsView test', () => {
  let resultView;
  beforeEach(async () => {
    document.documentElement.innerHTML = html;
    let resultViewM;
    await jest.isolateModulesAsync(async () => {
      resultViewM = await import('../../js/views/resultsView');
    });
    resultView = resultViewM.default;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should render search results correctly', () => {
    const searchResults = testHelper.searchRecipesResults();
    resultView.render(searchResults.data.recipes);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});
