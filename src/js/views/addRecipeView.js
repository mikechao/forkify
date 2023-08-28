import View from './View';

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
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
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
