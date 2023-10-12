/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');
const { async } = require('regenerator-runtime');
const html = fs.readFileSync(
  path.resolve(__dirname, '../../../index.html'),
  'utf8'
);

jest.dontMock('fs');

describe('deleteModelView test', () => {
  let deleteModalView;
  beforeEach(async () => {
    document.documentElement.innerHTML = html.toString();
    let deleteModalViewM;
    await jest.isolateModulesAsync(async () => {
      deleteModalViewM = await import('../../js/views/deleteModalView');
    });
    deleteModalView = deleteModalViewM.default;
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Delete handler that is successful', async () => {
    const handler = jest.fn().mockResolvedValue({ status: true, message: '' });

    deleteModalView.addHandlerDeleteUserRecipe(handler);
    const deleteButton = document.querySelector('.del-modal__delete-btn');
    // await the deleteButton click so that handler().then inside the function is called
    await deleteButton.click();
    expect(handler).toHaveBeenCalled();
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});
