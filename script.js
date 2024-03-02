let pokemon;
let pokedex = [];
let allPokemon = [];
let displayedPokemon = 20;

const TYPE_COLORS = {
    normal: '#AAAA99', fighting: '#BB5545', flying: '#8899FF', poison: '#AA5599', ground: '#DDBB55',
    rock: '#BBAA66', bug: '#AABB22', ghost: '#6667BC', fire: '#EC4225', water: '#4E9AFF',
    grass: '#77CC55', electric: '#F5CC34', psychic: '#EE5499', ice: '#66CCFF', dragon: '#7867EE',
    fairy: '#EE99AA'
};

async function init() {
    await loadAllPokemon();
    renderInitialPokedex();
}

async function loadAllPokemon() {
    for (let i = 1; i <= 151; i++) { 
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let pokeData = await response.json();
        allPokemon.push(pokeData); 
    }
}

function loadMorePokemon() {
    let newLimit = Math.min(displayedPokemon + 20, 151); 
    for (let i = displayedPokemon; i < newLimit; i++) {
        let pokeData = allPokemon[i];
        let pokemonType = pokeData['types'][0]['type']['name'];
        let bgColor = TYPE_COLORS[pokemonType];
        renderPokedexHTML(pokemonType, bgColor, i+1, pokeData);
    }
    displayedPokemon = newLimit; 
    if (displayedPokemon >= 151) {
        document.getElementById('load-more').style.display = 'none'; 
    }
}

function renderInitialPokedex() {
    for (let i = 0; i < displayedPokemon; i++) { 
        let pokeData = allPokemon[i];
        let pokemonType = pokeData['types'][0]['type']['name'];
        let bgColor = TYPE_COLORS[pokemonType];
        renderPokedexHTML(pokemonType, bgColor, i+1, pokeData);
    }
}

async function showPokemonCard(id) {
    document.body.style.overflow = 'hidden';
    renderPokeCard(allPokemon[id-1]);
    renderChart(allPokemon[id-1]);
}

function hidePokeCard() {
    document.getElementById('pokedex').innerHTML = '';
    document.body.style.overflow = 'auto';
}

function showNextPokemon() {
    let currentPokemonId = document.getElementById('pokemon-id').innerText;
    if (currentPokemonId < 151) {
        currentPokemonId ++;
        showPokemonCard(currentPokemonId);
    }
}

function showPreviousPokemon() {
    let currentPokemonId = document.getElementById('pokemon-id').innerText;
    if (currentPokemonId > 1) {
        currentPokemonId --;
        showPokemonCard(currentPokemonId);
    }
}