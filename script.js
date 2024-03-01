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