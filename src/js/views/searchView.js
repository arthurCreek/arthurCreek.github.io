import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
};

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
} 

const renderRecipe = recipe => {

    const uri = recipe.recipe.uri;
    const idArray = uri.split('#');
    const id = idArray[1];

    const markup = `
        <li>
            <a class="results__link" href="#${id}">
                <figure class="results__fig">
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.recipe.label)}</h4>
                    <p class="results__author">${recipe.recipe.source}</p>
                </div>
            </a>
        </li>   
    `;
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

// Type: 'prev' or 'next'
const createButton = (page, type) =>
    `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
        </button>
    `;

const renderButtons = (page, numResults, resPerPage) => {
    // use Math.ceil, for example if answer is 4.5 you want 5 pages to include the .5
    // const pages = Math.ceil(numResults / resPerPage);
    const pages = Math.ceil(numResults / resPerPage);

    let button;

    

    if(page === 1 && pages > 1) {
        //button go to next page
        button = createButton(page, 'next');

    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;

    } else if(page === pages && pages > 1) {
        // only go to previous page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    console.log(recipes);
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    
    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};