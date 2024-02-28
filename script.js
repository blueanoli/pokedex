let currentPokemon;
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

let max = 20;

async function loadPokemon(max){
   let url = `https://pokeapi.co/api/v2/pokemon/?limit=${max}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);

    renderPokemonInfo();

}

function renderPokemonInfo(){
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    document.getElementById('pokemon-id').innerHTML = currentPokemon['id'];
    document.getElementById('pokemon-image').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
}