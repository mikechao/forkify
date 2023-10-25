/**
 * @jest-environment jsdom
 */
import * as testHelper from '../testHelper';
const html = testHelper.indexHTMLContent().toString();

describe('deleteModelView test', () => {
  let deleteModalView;
  beforeEach(async () => {
    document.documentElement.innerHTML = html;
    let deleteModalViewM;
    await jest.isolateModulesAsync(async () => {
      deleteModalViewM = await import('../../js/views/deleteModalView');
    });
    deleteModalView = deleteModalViewM.default;
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Delete handler that is successful, then show a new recipe in the delete modal', async () => {
    const handler = jest.fn().mockResolvedValue({ status: true, message: '' });

    deleteModalView.addHandlerDeleteUserRecipe(handler);
    const deleteButton = document.querySelector('.del-modal__delete-btn');
    // await the deleteButton click so that handler().then inside the function is called
    await deleteButton.click();
    expect(handler).toHaveBeenCalled();
    expect(document.documentElement.innerHTML).toMatchSnapshot();

    const recipe = testHelper.getRecipe();
    deleteModalView.show(recipe);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should show an error message when the handler returns false', async () => {
    const handler = jest.fn().mockResolvedValue({
      status: false,
      message: 'Something went wrong with delete',
    });

    deleteModalView.addHandlerDeleteUserRecipe(handler);
    const deleteButton = document.querySelector('.del-modal__delete-btn');
    // await the deleteButton click so that handler().then inside the function is called
    await deleteButton.click();
    expect(handler).toHaveBeenCalled();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should show a reipce and then hide it', () => {
    const recipe = testHelper.getRecipe();
    deleteModalView.show(recipe);
    expect(document.documentElement.innerHTML).toMatchSnapshot();
    deleteModalView.hide();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it('should return undefined for _generateMarkup', () => {
    const result = deleteModalView._generateMarkup();
    expect(result).toBeUndefined();
  });

  it('should hide the window after timer is reached', () => {
    jest.useFakeTimers();
    const recipe = testHelper.getRecipe();
    deleteModalView.show(recipe);
    deleteModalView.hideWithTimeout();
    jest.runAllTimers();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});
