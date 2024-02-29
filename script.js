let pokemon;
let pokedex = [];

const TYPE_COLORS = {
    normal: '#AAAA99', fighting: '#BB5545', flying: '#8899FF', poison: '#AA5599', ground: '#DDBB55',
    rock: '#BBAA66', bug: '#AABB22', ghost: '#6667BC', fire: '#EC4225', water: '#4E9AFF',
    grass: '#77CC55', electric: '#F5CC34', psychic: '#EE5499', ice: '#66CCFF', dragon: '#7867EE'
};

function init(){
    loadPokemon();
}

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;
    let response = await fetch(url);
    pokemon = await response.json();
 
    renderPokedex();
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

        document.getElementById('main-container').innerHTML += /*html*/ `
            <div class="pokemon" style="background-color: ${bgColor};" onclick="showPokemon(${pokeData['id']})">
                <div class="headline">
                    <h1>${pokeData['name'].charAt(0).toUpperCase() + pokeData['name'].slice(1)}</h1>
                    <h1>${id}</h1>
                </div>
                <div class="types">
                    <p>Type: ${pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)}</p>
                </div>
                <img src="${pokeData['sprites']['other']['dream_world']['front_default']}" alt="${pokeData.name}">
            </div>`;
    }
}

async function showPokemon(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    let pokeData = await response.json();
    
    renderPokeCard(pokeData);
}

function hidePokeCard(){
    document.getElementById('pokedex').innerHTML = '';
}
 
// RENDER HTML -----------------------------------------------------------------------------------------------------------

function renderPokeCard(pokeData){
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
            <div class="types">
                <p>Type: ${pokeData['types'][0]['type']['name'].charAt(0).toUpperCase() + pokeData['types'][0]['type']['name'].slice(1)}</p>
            </div>
            <img id="pokemon-image" src="${pokeData['sprites']['other']['dream_world']['front_default']}" alt="${pokeData.name}">
        </div>
        <div onclick="hidePokeCard()" class="info-container">
            <nav>
                <h2 onclick>About</h2>
                <h2 onclick>Base Stats</h2>
            </nav>
            <div class="base-stats">
                <p>HP: ${pokeData['stats'][0]['base_stat']}</p>
                <p>Attack: ${pokeData['stats'][1]['base_stat']}</p>
                <p>Defense: ${pokeData['stats'][2]['base_stat']}</p>
                <p>Special Attack: ${pokeData['stats'][3]['base_stat']}</p>
                <p>Special Defense: ${pokeData['stats'][4]['base_stat']}</p>
                <p>Speed: ${pokeData['stats'][5]['base_stat']}</p>
            </div>
        </div>
    </div>
    `;
}