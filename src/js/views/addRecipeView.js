import View from './View';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _messageRendered = false;
  _htmlForm = this._parentElement.innerHTML;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHanlderHideWindow();
  }

  showWindow() {
    if (this._messageRendered) {
      this._parentElement.innerHTML = '';
      this._parentElement.innerHTML = this._htmlForm;
    }
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
  }

  closeWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.showWindow.bind(this));
  }

  _addHanlderHideWindow() {
    this._btnClose.addEventListener('click', this.closeWindow.bind(this));
    this._overlay.addEventListener('click', this.closeWindow.bind(this));
  }

  addHandlerUpload(handler) {
    const that = this;
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      if (!that.isValidIngredients(dataArr)) return;
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  isValidIngredients(dataArr) {
    let noErrors = true;
    dataArr
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3) {
          const input = document.querySelector(`input[name="${ing[0]}"]`);
          input.style.borderColor = 'red';
          const instance = tippy(input, {
            content: `Please use the format: 'Quantity,Unit,Description'`,
            placement: 'bottom',
          });
          input.addEventListener('focus', function () {
            input.style.borderColor = '';
            instance.destroy();
          });
          noErrors = false;
        }
      });

    return noErrors;
  }

  renderMessage(message = this._message) {
    super.renderMessage(message);
    this._messageRendered = true;
  }

  renderError(message = this._errorMessage) {
    super.renderError(message);
    this._messageRendered = true;
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
