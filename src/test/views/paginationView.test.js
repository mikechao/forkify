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

describe('paginationView test', () => {
  let paginationView;
  let data;
  beforeEach(async () => {
    document.documentElement.innerHTML = html.toString();
    let paginationViewM;
    await jest.isolateModulesAsync(async () => {
      paginationViewM = await import('../../js/views/paginationView');
    });
    paginationView = paginationViewM.default;
    data = {
      query: 'tea',
      results: testHelper.searchRecipesResults().data.recipes,
      page: 1,
      resultsPerPage: 1,
    };
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should render the first page correctly', () => {
    paginationView.render(data);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render the second page correctly', () => {
    data.page = 2;
    paginationView.render(data);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render the last page correctly', () => {
    data.page = 3;
    paginationView.render(data);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should render just 1 page', () => {
    data.resultsPerPage = 10;
    paginationView.render(data);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should call the handler when buttons are clicked', () => {
    const handler = jest.fn();
    paginationView.addHandlerClick(handler);
    data.page = 2;
    paginationView.render(data);
    const previousBtn = document.querySelector('[data-goto="1"]');
    previousBtn.click();
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(1);

    const nextBtn = document.querySelector('[data-goto="3"]');
    nextBtn.click();
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(3);
  });

  it('should NOT call the handler when the div is clicked', () => {
    const handler = jest.fn();
    paginationView.addHandlerClick(handler);
    data.page = 2;
    paginationView.render(data);
    const pagination = document.querySelector('.pagination');
    const div = pagination.getElementsByTagName('div')[0];
    div.click();

    expect(handler).not.toHaveBeenCalled();
  });
});
