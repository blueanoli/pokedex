let pokemon;

let NORMAL_COLOR = '#AAAA99';
let FIGHTING_COLOR = '#BB5545';
let FLYING_COLOR = '#8899FF';
let POISON_COLOR = '#AA5599';
let GROUND_COLOR = '#DDBB55';
let ROCK_COLOR = '#BBAA66';
let BUG_COLOR = '#AABB22';
let GHOST_COLOR = '#6667BC';
let FIRE_COLOR = '#EC4225';
let WATER_COLOR = '#4E9AFF';
let GRASS_COLOR = '#77CC55';
let ELECTRIC_COLOR = '#F5CC34';
let PSYCHIC_COLOR = '#EE5499';
let ICE_COLOR = '#66CCFF';
let DRAGON_COLOR = '#7867EE';

let pokedex = [];
let id = [];

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;
    let response = await fetch(url);
    pokemon = await response.json();
    console.log(pokemon);
    renderPokedex();
    //renderPokemonInfo(); // --> JUNUS CODE
}

// function renderPokemonInfo() { // --> JUNUS CODE
//     document.getElementById('pokemon-name').innerHTML = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
//     document.getElementById('pokemon-id').innerHTML = pokemon['id'];
//     document.getElementById('pokemon-image').src = pokemon['sprites']['other']['dream_world']['front_default'];
// }

async function renderPokedex() {
    document.getElementById('main-container').innerHTML = '';
    pokedex = pokemon['results'];
    // let pokeURL = `https://pokeapi.co/api/v2/pokemon/0/`;
    // let response = await fetch(pokeURL);
    // pokeData = await response.json();
    // console.log(pokeData);

    for (let i = 0; i < pokedex.length; i++) {
        document.getElementById('main-container').innerHTML += /*html*/ `
            <div id="pokemon">
                <h1>${pokemon['results'][i]['name'].charAt(0).toUpperCase() + pokemon['results'][i]['name'].slice(1)}</h1>
            </div>
        `;
    }
}