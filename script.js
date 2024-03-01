let pokemon;
let pokedex = [];
let limit = Math.min(20, 151 - pokedex.length);

const TYPE_COLORS = {
    normal: '#AAAA99', fighting: '#BB5545', flying: '#8899FF', poison: '#AA5599', ground: '#DDBB55',
    rock: '#BBAA66', bug: '#AABB22', ghost: '#6667BC', fire: '#EC4225', water: '#4E9AFF',
    grass: '#77CC55', electric: '#F5CC34', psychic: '#EE5499', ice: '#66CCFF', dragon: '#7867EE'
};

function init() {
    loadPokemon();
}

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`;
    let response = await fetch(url);
    pokemon = await response.json();

    renderPokedex();
}


async function loadMore() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=${pokedex.length}&limit=${limit}`;
    let response = await fetch(url);
    let morePokemon = await response.json();
    pokedex = pokedex.concat(morePokemon['results']);

    for (let i = 0; i < morePokemon['results'].length; i++) {
        let pokeURL = morePokemon['results'][i].url;
        let response = await fetch(pokeURL);
        let pokeData = await response.json();
        let pokemonType = pokeData['types'][0]['type']['name'];
        let bgColor = TYPE_COLORS[pokemonType];
        const id = pokeData['id'];
        renderPokedexHTML(pokemonType, bgColor, id, pokeData);
    }
    if (pokedex.length >= 151) {
        document.getElementById('load-more').style.display = 'none';
    }
}

async function renderPokedex() {
    document.getElementById('main-container').innerHTML = '';
    pokedex = pokemon['results'];

    for (let i = 0; i < pokedex.length; i++) {
        let pokeURL = pokedex[i].url;
        let response = await fetch(pokeURL);
        let pokeData = await response.json();
        let pokemonType = pokeData['types'][0]['type']['name'];
        let bgColor = TYPE_COLORS[pokemonType];
        const id = pokeData['id'];
        renderPokedexHTML(pokemonType, bgColor, id, pokeData);
    }
}

async function showPokemonCard(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    let pokeData = await response.json();

    renderPokeCard(pokeData);
    renderChart(pokeData);
}

function hidePokeCard() {
    document.getElementById('pokedex').innerHTML = '';
}


// RENDER HTML -----------------------------------------------------------------------------------------------------------

function renderPokeCard(pokeData) {
    const id = pokeData['id'];

    document.getElementById('pokedex').innerHTML = '';
    document.getElementById('pokedex').innerHTML += /*html*/ `
    <div class="pokedex-wrapper">
        <div class="navigation-btn">
            <img onclick="showPreviousPokemon()" id="previous" src="./img/previous.png" alt="PREVIOUS">
            <img onclick="showNextPokemon()" id="next" src="./img/next.png" alt="NEXT">
        </div>
        <div onclick="hidePokeCard()" class="pokedex" style="background-color: ${TYPE_COLORS[pokeData['types'][0]['type']['name']]};">
            <div id="pokemon-name">
                <h1>${pokeData['name'].charAt(0).toUpperCase() + pokeData['name'].slice(1)}</h1>
                <h1>${id}</h1>
            </div>
            <div class="types types-card">
                <p>Type 1: ${pokeData['types'][0]['type']['name'].charAt(0).toUpperCase() + pokeData['types'][0]['type']['name'].slice(1)}</p>
                <p>Type 2: ${pokeData['types'][1] ? pokeData['types'][1]['type']['name'].charAt(0).toUpperCase() + pokeData['types'][1]['type']['name'].slice(1) : 'None'}</p>
            </div>
            <img id="pokemon-image" src="${pokeData['sprites']['other']['dream_world']['front_default']}" alt="${pokeData.name}">
        </div>
        <div onclick="hidePokeCard()" class="info-container">
            <nav>
                <h2>Base Stats</h2>
            </nav>
            <div class="base-stats">
                <div>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderPokedexHTML(pokemonType, bgColor, id, pokeData) {
    document.getElementById('main-container').innerHTML += /*html*/ `
        <div class="pokemon" style="background-color: ${bgColor};" onclick="showPokemonCard(${pokeData['id']})">
            <div class="headline">
                <h1>${pokeData['name'].charAt(0).toUpperCase() + pokeData['name'].slice(1)}</h1>
                <div class="headline-id">
                    <h3>${id}</h3>
                </div>
            </div>
            <div class="types">
                <p>Type 1: ${pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)}</p>
                <p>Type 2: ${pokeData['types'][1] ? pokeData['types'][1]['type']['name'].charAt(0).toUpperCase() + pokeData['types'][1]['type']['name'].slice(1) : 'None'}</p>
            </div>
            <img src="${pokeData['sprites']['other']['dream_world']['front_default']}" alt="${pokeData.name}">
        </div>`;
}