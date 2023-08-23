import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--pagination');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateNextButton(curPage, hide = false) {
    return `
    <button data-goto="${curPage + 1}" class="btn--inline btn--pagination ${
      hide ? 'hidden' : ''
    }">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
  `;
  }

  _generateCurrentPage(curPage, numPages) {
    return `
    <div class="btn--inline">
        <span>${curPage} of ${numPages}</span>
    </div>
    `;
  }

  _generatePrevButton(curPage, hide = false) {
    return `
    <button data-goto="${curPage - 1}" class="btn--inline btn--pagination ${
      hide ? 'hidden' : ''
    }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>
  `;
  }

  _generateNavMarkup(curPage, numPages, hidePrev = false, hideNext = false) {
    return (
      this._generatePrevButton(curPage, hidePrev) +
      this._generateCurrentPage(curPage, numPages) +
      this._generateNextButton(curPage, hideNext)
    );
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNavMarkup(curPage, numPages, true);
    }
    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateNavMarkup(curPage, numPages, false, true);
    }
    // Other page
    if (this._data.page < numPages) {
      return this._generateNavMarkup(curPage, numPages);
    }
    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
