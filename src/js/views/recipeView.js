import View from './View';
import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';
import noImage from 'url:../../img/no-image.png';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message;

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      const { updateTo } = btn.dataset;

      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  addHandlerDeleteUserRecipe(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--delete');
      if (!btn) return;
      handler();
    });
  }

  renderStartingView() {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </div>
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" onerror="this.onerror=null;this.src='${noImage}';this.className='recipe__img_error'"/>
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <div class="recipe__info-buttons">
        <button class="btn--round btn--delete ${
          this._data.key ? '' : 'hidden'
        }">
          <svg class="">
            <use href="${icons}#icon-delete"></use>
          </svg>
        </button>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>

    <div class="recipe__nutrition">
      <h2 class="heading--2">Nutrition Information</h2>
    </div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? fracty(ing.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
    </div>
    </li>
    `;
  }

  widgetScriptFinished(widget, content) {
    const iframeDocument = widget.contentDocument;
    iframeDocument.open();
    iframeDocument.write(content);
    iframeDocument.close();

    const nutritionWidgetScript = document.createElement('script');
    nutritionWidgetScript.setAttribute('type', 'text/javascript');
    nutritionWidgetScript.setAttribute(
      'src',
      'https://spoonacular.com/application/frontend/js/nutritionWidget.min.js?c=1'
    );
    widget.contentDocument.body.appendChild(nutritionWidgetScript);
  }

  widgetLoaded(widget, content) {
    if (widget.contentWindow.jQuery && widget.contentWindow.CanvasJS) {
      this.widgetScriptFinished(widget, content);
    } else {
      const that = this;
      setTimeout(function () {
        that.widgetLoaded(widget, content);
      }, 50);
    }
  }

  renderNutritionWidget(content) {
    const iFrame = document.createElement('iframe');
    iFrame.id = 'nutritionWidget';
    iFrame.classList.add('recipe__widget');
    iFrame.onload = () => this.widgetLoaded(iFrame, content);
    document.querySelector('.recipe__nutrition').appendChild(iFrame);

    const jQueryScript = document.createElement('script');
    jQueryScript.setAttribute('type', 'text/javascript');
    jQueryScript.setAttribute(
      'src',
      'https://code.jquery.com/jquery-1.9.1.min.js'
    );
    iFrame.contentDocument.head.appendChild(jQueryScript);

    const canvasScript = document.createElement('script');
    canvasScript.setAttribute('type', 'text/javascript');
    canvasScript.setAttribute(
      'src',
      'https://spoonacular.com/application/frontend/js/jquery.canvasjs.min'
    );
    iFrame.contentDocument.head.appendChild(canvasScript);
  }
}

export default new RecipeView();
