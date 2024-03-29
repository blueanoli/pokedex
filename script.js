/**
 * An array to store the Pokémon that are currently rendered in the Pokédex UI. This can include a subset of `allPokemon`
 * if pagination or filtering is applied.
 * @type {Array<Object>}
 */
let pokedex = [];

/**
 * A global array that stores all Pokémon data fetched from the API. Each element in the array is an object
 * containing detailed information about a single Pokémon, such as its name, type, stats, and more.
 * @type {Array<Object>}
 */
let allPokemon = [];

/**
 * The number of Pokémon currently displayed in the Pokédex UI. This variable can be used to implement pagination
 * or to load more Pokémon data on demand.
 * @type {number}
 */
let displayedPokemon = 20;

/**
 * The base URL for the Pokémon API. This URL is used as the prefix for all API requests to fetch Pokémon data.
 * @type {string}
 */
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

/**
 * An object mapping Pokémon types to their corresponding colors for UI display. Each key is a Pokémon type,
 * and each value is a color code representing that type. This object is used to style Pokémon entries in the UI
 * according to their types.
 * @type {{[type: string]: string}}
 */
const TYPE_COLORS = {
    normal: '#AAAA99', fighting: '#BB5545', flying: '#8899FF', poison: '#AA5599', ground: '#DDBB55',
    rock: '#BBAA66', bug: '#AABB22', ghost: '#6667BC', fire: '#EC4225', water: '#4E9AFF',
    grass: '#77CC55', electric: '#F5CC34', psychic: '#EE5499', ice: '#66CCFF', dragon: '#7867EE',
    fairy: '#EE99AA', steel: '#BBBBBB', dark: '#774411'
};


/**
 * Initializes the application by showing the loading screen, loading initial Pokémon data,
 * then rendering the initial Pokédex view and loading the remaining Pokémon data.
 */
async function init() {
    showLoadingScreen();
    await loadInitialPokemon();
    setTimeout(async () => {
        hideLoadingScreen();
        renderInitialPokedex();
        loadRemainingPokemon();
    }, 500);
}

/**
 * Loads the initial set of Pokémon data asynchronously from a predefined base URL.
 */
async function loadInitialPokemon() {
    for (let i = 1; i <= 20; i++) {
        const url = `${BASE_URL}${i}/`;
        let response = await fetch(url);
        let pokeData = await response.json();
        allPokemon.push(pokeData);
    }
}

/**
 * Continues loading the remaining Pokémon data asynchronously after the initial set,
 * starting from the 21st entry up to the 250th.
 */
async function loadRemainingPokemon() {
    for (let i = 21; i <= 250; i++) {
        const url = `${BASE_URL}${i}/`;
        let response = await fetch(url);
        let pokeData = await response.json();
        allPokemon.push(pokeData);
    }
}

/**
 * Loads more Pokémon into the Pokédex view, up to 20 more, until all 250 are displayed.
 * Updates the displayed Pokémon count and hides the "Load More" button if necessary.
 */
function loadMorePokemon() {
    let newLimit = Math.min(displayedPokemon + 20, 250);
    for (let i = displayedPokemon; i < newLimit; i++) {
        let pokeData = allPokemon[i];
        let pokemonType = pokeData['types'][0]['type']['name'];
        let bgColor = TYPE_COLORS[pokemonType];
        renderPokedexHTML(pokemonType, bgColor, i + 1, pokeData);
    }
    displayedPokemon = newLimit;
    if (displayedPokemon >= 250) {
        hideLoadMoreButton();
    }
}

/**
 * Renders the initial set of Pokémon in the Pokédex view, based on the currently displayed Pokémon count.
 */
function renderInitialPokedex() {
    for (let i = 0; i < displayedPokemon; i++) {
        let pokeData = allPokemon[i];
        let pokemonType = pokeData['types'][0]['type']['name'];
        let bgColor = TYPE_COLORS[pokemonType];
        renderPokedexHTML(pokemonType, bgColor, i + 1, pokeData);
    }
}

/**
 * Displays a detailed view of a single Pokémon card, including its type, stats, and navigation arrows.
 * @param {number} id - The ID of the Pokémon to display.
 */
function showPokemonCard(id) {
    document.body.style.overflow = 'hidden';
    renderPokeCard(allPokemon[id - 1]);
    renderChart(allPokemon[id - 1]);
    adjustNavigationArrows(id);
}

/**
 * Hides the detailed Pokémon card view and restores the main Pokédex view.
 */
function hidePokeCard() {
    document.getElementById('pokedex').innerHTML = '';
    document.body.style.overflow = 'auto';
}

/**
 * Adjusts the visibility of navigation arrows based on the current Pokémon's ID.
 * @param {number} currentPokemonId - The ID of the currently displayed Pokémon.
 */
function adjustNavigationArrows(currentPokemonId) {
    const maxPokemonId = 250; 

    if (currentPokemonId <= 1) {
        hidePreviousArrow();
    } else {
       showPreviousArrow();
    }
    if (currentPokemonId >= maxPokemonId) {
        hideNextArrow();
    } else {
       showNextArrow();
    }
}

/**
 * Shows the next Pokémon in the Pokédex, if not at the end, and adjusts navigation arrows accordingly.
 */
function showNextPokemon() {
    let currentPokemonId = parseInt(document.getElementById('pokemon-id').innerText);
    if (currentPokemonId < 250) {
        currentPokemonId++;
        showPokemonCard(currentPokemonId);
    }
    adjustNavigationArrows(currentPokemonId);
}

/**
 * Shows the previous Pokémon in the Pokédex, if not at the beginning, and adjusts navigation arrows accordingly.
 */
function showPreviousPokemon() {
    let currentPokemonId = parseInt(document.getElementById('pokemon-id').innerText);
    if (currentPokemonId > 1) {
        currentPokemonId--;
        showPokemonCard(currentPokemonId);
    }
    adjustNavigationArrows(currentPokemonId);
}

/**
 * Filters the Pokémon displayed in the Pokédex based on a search query.
 */
function filterPokemon() {
    let search = document.getElementById('search').value.toLowerCase();

    if (search.length >= 3) {
        filterPokemonBySearch(search);
    } else if (search.length === 0) {
        resetPokedexView();
    }
}

/**
 * Filters and displays Pokémon that match the search query.
 * @param {string} search - The search query used to filter Pokémon.
 */
function filterPokemonBySearch(search) {
    clearMainContainer();
    hideLoadMoreButton();

    for (let i = 0; i < allPokemon.length; i++) {
        if (allPokemon[i]['name'].toLowerCase().includes(search)) {
            renderPokedexHTML(allPokemon[i]['types'][0]['type']['name'], TYPE_COLORS[allPokemon[i]['types'][0]['type']['name']], i + 1, allPokemon[i]);
        }
    }
}

/**
 * Resets the Pokédex view to its initial state, clearing any search filters and displaying the "Load More" button.
 */
function resetPokedexView() {
    clearMainContainer();
    renderInitialPokedex();
    document.getElementById('load-more').style.display = 'block';
}

// HILFSFUNKTIONEN -----------------------------------------------------------
function showLoadingScreen() {
    hideLoadMoreButton();
    document.getElementById('loading-screen').style.display = 'flex';
}

function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('load-more').style.display = 'block';
}

function clearMainContainer() {
    document.getElementById('main-container').innerHTML = '';
}

function hideLoadMoreButton() {
    document.getElementById('load-more').style.display = 'none';
}

function showNextArrow() {
    document.getElementById('next').style.opacity = '1';
    document.getElementById('next').style.cursor = 'pointer';
}

function showPreviousArrow() {
    document.getElementById('previous').style.opacity = '1';
    document.getElementById('previous').style.cursor = 'pointer';
}

function hideNextArrow() {
    document.getElementById('next').style.opacity = '0';
    document.getElementById('next').style.cursor = 'default';
}

function hidePreviousArrow() {
    document.getElementById('previous').style.opacity = '0';
    document.getElementById('previous').style.cursor = 'default';
}