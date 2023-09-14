import View from './View';
import { MODEL_CLOSE_SEC } from './../config.js';

class DeleteModalView extends View {
  _parentElement = document.querySelector('.del-modal-content');
  _window = document.querySelector('.del-modal');
  _overlay = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-del-modal');
  _btnCancel = document.querySelector('.del-modal__cancel-btn');
  _btnDelete = document.querySelector('.del-modal__delete-btn');
  _message = 'Recipe was successfully deleted';
  _delModalContent = this._parentElement.querySelectorAll('.delContent');
  _messageRender = false;

  constructor() {
    super();
    this.#addHandlers();
  }

  #addHandlers() {
    this._overlay.addEventListener('click', this.hide.bind(this));
    this._btnClose.addEventListener('click', this.hide.bind(this));
    this._btnCancel.addEventListener('click', this.hide.bind(this));
  }

  addHandlerDeleteUserRecipe(handler) {
    const that = this;
    this._btnDelete.addEventListener('click', function () {
      that.renderSpinner();
      handler().then(function (result) {
        const { status, message } = result;
        if (status) that.renderMessage();
        if (!status) that.renderError(message);
        that._messageRender = true;
        setTimeout(function () {
          that.hide();
        }, MODEL_CLOSE_SEC * 1000);
      });
    });
  }

  #removeAllChild() {
    while (this._parentElement.firstChild) {
      this._parentElement.removeChild(this._parentElement.lastChild);
    }
  }

  show() {
    if (this._messageRender) {
      this.#removeAllChild();
      this._delModalContent.forEach(child =>
        this._parentElement.appendChild(child)
      );
      this._messageRender = false;
    }
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
  }

  hide() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }

  _generateMarkup() {}
}

export default new DeleteModalView();
