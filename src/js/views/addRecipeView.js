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
  _btnAddIng = document.querySelector('.btn--add-ing');
  _btnRemoveIng = document.querySelector('.btn--remove-ing');
  _ingredientsColumn = document.querySelector('.ing__column');
  _dataColumn = document.querySelector('.data__column');
  _btnUpload = document.querySelector('.upload__btn');
  _editMode = false;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHanlderHideWindow();
    this._addHandlerAddRemoveIng();
  }

  showWindow() {
    if (this._messageRendered) {
      this.removeAllChild();
      // add back the elements since they were removed rendering the message, keeping the event listeners and reset the values of the form
      this._parentElement.appendChild(this._btnAddIng);
      this._parentElement.appendChild(this._btnRemoveIng);
      this._parentElement.appendChild(this._dataColumn);
      // restore the default view of having 2 visible labels and inputs for ingredients
      const labels = this._ingredientsColumn.querySelectorAll('label');
      labels.forEach((label, index) => {
        if (index > 1) {
          label.classList.add('hidden');
        }
      });
      const inputs = this._ingredientsColumn.querySelectorAll('input');
      inputs.forEach((input, index) => {
        if (index > 1) {
          input.classList.add('hidden');
        }
      });
      this._parentElement.appendChild(this._ingredientsColumn);
      this._parentElement.appendChild(this._btnUpload);
      this._parentElement.reset();
    }
    if (this._editMode) this._parentElement.reset();
    this._editMode = false;
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
  }

  showEditWindow(recipe) {
    this.showWindow();
    this._editMode = true;
    // set the input fields values for the data column since the name attriubute on the input field matches the key in the recipe
    const keysToIgnore = ['ingredients', 'key', 'bookmarked', 'id'];
    Object.keys(recipe)
      .filter(key => !keysToIgnore.includes(key))
      .forEach(key => {
        this._dataColumn.querySelector(`input[name=${key}]`).value =
          recipe[key];
      });

    recipe.ingredients.forEach((ing, index) => {
      const input = this._ingredientsColumn.querySelector(
        `input[name=ingredient-${index + 1}]`
      );
      const val = `${ing.quantity === null ? '' : ing.quantity},${
        ing.unit === null ? '' : ing.unit
      },${ing.description === null ? '' : ing.description}`;
      input.value = val;
      input.classList.remove('hidden');
      const label = this._ingredientsColumn.querySelector(
        `label[for=ingredient-${index + 1}]`
      );
      label.classList.remove('hidden');
    });
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

  _addHandlerAddRemoveIng() {
    this._btnAddIng.addEventListener('click', this._addIngredient.bind(this));
    this._btnRemoveIng.addEventListener(
      'click',
      this._removeIngredient.bind(this)
    );
  }

  _addIngredient() {
    const labelTagsNL = this._ingredientsColumn.querySelectorAll('label');
    const label = Array.from(labelTagsNL).find(el =>
      el.classList.contains('hidden')
    );
    if (!label) this._addNewLabelAndInput();
    else this._toggleHidden(label);
  }

  _addNewLabelAndInput() {
    // add hidden label and input on the data column side to keep formatting
    const dataLabel = document.createElement('label');
    dataLabel.classList.add('hidden');
    const dataInput = document.createElement('input');
    dataInput.classList.add('hidden');
    this._dataColumn.appendChild(dataLabel);
    this._dataColumn.appendChild(dataInput);

    // create and add label and input for the ingredient column side
    const labelTags = this._ingredientsColumn.querySelectorAll('label');
    const ingLabel = document.createElement('label');
    ingLabel.textContent = `Ingredient ${labelTags.length + 1}`;
    ingLabel.htmlFor = `ingredient-${labelTags.length + 1}`;
    const ingInput = document.createElement('input');
    ingInput.setAttribute('type', 'text');
    ingInput.setAttribute('name', `ingredient-${labelTags.length + 1}`);
    ingInput.setAttribute('placeholder', `Format: 'Quantity,Unit,Description'`);

    this._ingredientsColumn.appendChild(ingLabel);
    this._ingredientsColumn.appendChild(ingInput);
  }

  _toggleHidden(label) {
    label.classList.toggle('hidden');
    label.nextElementSibling.classList.toggle('hidden');
    label.nextElementSibling.value = '';
  }

  _removeIngredient() {
    const labelTagsNL = this._ingredientsColumn.querySelectorAll('label');
    if (labelTagsNL.length < 7) {
      const label = Array.from(labelTagsNL)
        .reverse()
        .find(el => !el.classList.contains('hidden'));
      // for now keep at least 2 ingredients
      if (label.textContent.endsWith('2')) return;
      this._toggleHidden(label);
    } else this._removeLabelAndInput();
  }

  _removeLabelAndInput() {
    const labelTagsNL = this._ingredientsColumn.querySelectorAll('label');
    const lastIngLabel = labelTagsNL[labelTagsNL.length - 1];
    const lastIngInput = lastIngLabel.nextElementSibling;
    lastIngInput.value = '';
    this._ingredientsColumn.removeChild(lastIngInput);
    this._ingredientsColumn.removeChild(lastIngLabel);

    const dataLabelTags = this._dataColumn.querySelectorAll('label');
    const lastDataLabel = dataLabelTags[dataLabelTags.length - 1];
    const lastDataInput = lastDataLabel.nextElementSibling;
    this._dataColumn.removeChild(lastDataInput);
    this._dataColumn.removeChild(lastDataLabel);
  }

  addHandlerUpload(addHandler, editHandler) {
    const that = this;
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      if (!that.isValidIngredients(dataArr)) return;
      const data = Object.fromEntries(dataArr);
      if (that._editMode) editHandler(data);
      if (!that._editMode) addHandler(data);
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
