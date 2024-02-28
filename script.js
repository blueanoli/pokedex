let pokemon;
let pokedex = [];
const TYPE_COLORS = {
    normal: '#AAAA99',
    fighting: '#BB5545',
    flying: '#8899FF',
    poison: '#AA5599',
    ground: '#DDBB55',
    rock: '#BBAA66',
    bug: '#AABB22',
    ghost: '#6667BC',
    fire: '#EC4225',
    water: '#4E9AFF',
    grass: '#77CC55',
    electric: '#F5CC34',
    psychic: '#EE5499',
    ice: '#66CCFF',
    dragon: '#7867EE'
};

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;
    let response = await fetch(url);
    pokemon = await response.json();
    console.log(pokemon);
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

        document.getElementById('main-container').innerHTML += /*html*/ `
            <div class="pokemon" style="background-color: ${bgColor};" onclick="showPokemon(${pokeData['id']})">
                <div class="headline">
                    <h1>${pokeData['name'].charAt(0).toUpperCase() + pokeData['name'].slice(1)}</h1>
                    <h1>${pokeData['id']}</h1>
                </div>
                <div class="types">
                    <p>Type: ${pokeData['types'][0]['type']['name'].charAt(0).toUpperCase() + pokeData['types'][0]['type']['name'].slice(1)}</p>
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
// RENDER HTML -----------------------------------------------------------------------------------------------------------

function renderPokeCard(pokeData){
    document.getElementById('pokedex').innerHTML = '';
    document.getElementById('pokedex').innerHTML += /*html*/ `
        <div class="pokedex" style="background-color: ${TYPE_COLORS[pokeData['types'][0]['type']['name']]};">
            <div id="pokemon-name">
                <h1>${pokeData['name'].charAt(0).toUpperCase() + pokeData['name'].slice(1)}</h1>
                <h1>${pokeData['id']}</h1>
            </div>
            <div class="types">
                <p>Type: ${pokeData['types'][0]['type']['name'].charAt(0).toUpperCase() + pokeData['types'][0]['type']['name'].slice(1)}</p>
            </div>
            <img id="pokemon-image" src="${pokeData['sprites']['other']['dream_world']['front_default']}" alt="${pokeData.name}">
        </div>
        <div class="info-container">
            <h2>Stats</h2>
            <p>HP: ${pokeData['stats'][0]['base_stat']}</p>
            <p>Attack: ${pokeData['stats'][1]['base_stat']}</p>
            <p>Defense: ${pokeData['stats'][2]['base_stat']}</p>
            <p>Special Attack: ${pokeData['stats'][3]['base_stat']}</p>
            <p>Special Defense: ${pokeData['stats'][4]['base_stat']}</p>
            <p>Speed: ${pokeData['stats'][5]['base_stat']}</p>
        </div>
    `;
}