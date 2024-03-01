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
            <div id="pokemon-name" class="card-headline">
                <h1>${pokeData['name'].charAt(0).toUpperCase() + pokeData['name'].slice(1)}</h1>
                <div class="card-headline-id">
                <h2>${id}</h2>
                </div>
            </div>
            <div class="types card-types">
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
                <div class="myChart">
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