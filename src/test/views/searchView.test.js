/**
 * @jest-environment jsdom
 */
describe('SearchView test', () => {
  const htmlForm = `
  <form class="search">
    <input
      type="text"
      class="search__field"
      placeholder="Search over 1,000,000 recipes..."
    />
    <button class="btn search__btn">
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-search"></use>
      </svg>
      <span>Search</span>
    </button>
  </form>`;
  let searchView;
  let dom;

  beforeEach(async () => {
    const parser = new window.DOMParser();
    dom = parser.parseFromString(htmlForm, 'text/html');
    jest
      .spyOn(document, 'querySelector')
      .mockImplementation(selector => dom.querySelector(selector));
    let searchViewM;
    await jest.isolateModulesAsync(async () => {
      searchViewM = await import('../../js/views/searchView');
    });
    searchView = searchViewM.default;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getQuery should be empty', () => {
    const query = searchView.getQuery();
    expect(!query).toBe(true);
  });

  it('getQuery should return a value', () => {
    const inputFieldValue = 'tea';
    const inputField = dom.querySelector('.search__field');
    inputField.value = inputFieldValue;

    const query = searchView.getQuery();
    expect(query).toBe(inputFieldValue);
  });

  it('should call handler function once', () => {
    const handler = jest.fn();
    searchView.addHandlerSearch(handler);
    const button = dom.querySelector('.search__btn');
    button.click();
    expect(handler).toHaveBeenCalled();
  });
});
