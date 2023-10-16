/**
 * @jest-environment jsdom
 */
import * as testHelper from '../testHelper';
const fs = require('fs');
const path = require('path');
const { async } = require('regenerator-runtime');
const html = fs.readFileSync(
  path.resolve(__dirname, '../../../index.html'),
  'utf8'
);

jest.dontMock('fs');

describe('resultsView test', () => {
  let resultView;
  beforeEach(async () => {
    document.documentElement.innerHTML = html.toString();
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
