/**
 * @jest-environment jsdom
 */
import * as testHelper from '../testHelper';
const html = testHelper.indexHTMLContent().toString();

describe('bookmarksView test', () => {
  let bookmarksView;
  beforeEach(async () => {
    document.documentElement.innerHTML = html;
    let bookmarksViewM;
    await jest.isolateModulesAsync(async () => {
      bookmarksViewM = await import('../../js/views/bookmarksView');
    });
    bookmarksView = bookmarksViewM.default;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should render bookmarks correctly', () => {
    const bookmarks = testHelper.bookmarkedRecipes();
    bookmarksView.render(bookmarks);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should call the handler when the window fires the load event', () => {
    const handler = jest.fn();
    bookmarksView.addHanlderRender(handler);
    window.dispatchEvent(new Event('load'));
    expect(handler).toHaveBeenCalled();
  });
});
