// RENDER HTML -----------------------------------------------------------------------------------------------------------

/**
 * Renders a detailed view of a single Pokémon card. It displays the Pokémon's name, ID, types, and image.
 * If the Pokémon has a second type, it is also displayed. This function also adds navigation buttons for
 * moving to the previous or next Pokémon and a background color corresponding to the Pokémon's primary type.
 * @param {Object} allPokemon - An object containing all the details of a single Pokémon.
 */
function renderPokeCard(allPokemon) {
    let id = allPokemon['id'];
    let type2Html = allPokemon['types'][1] ? `<p>Type 2: ${allPokemon['types'][1]['type']['name'].charAt(0).toUpperCase() + allPokemon['types'][1]['type']['name'].slice(1)}</p>` : '';
    document.getElementById('pokedex').innerHTML = '';
    document.getElementById('pokedex').innerHTML += /*html*/ `
    <div class="pokedex-wrapper">
        <div class="navigation-btn">
            <img onclick="showPreviousPokemon()" id="previous" src="./img/previous.png" alt="PREVIOUS">
            <img onclick="showNextPokemon()" id="next" src="./img/next.png" alt="NEXT">
        </div>
        <div onclick="hidePokeCard()" class="pokedex" style="background-color: ${TYPE_COLORS[allPokemon['types'][0]['type']['name']]};">
            <div id="pokemon-name" class="card-headline">
                <h1>${allPokemon['name'].charAt(0).toUpperCase() + allPokemon['name'].slice(1)}</h1>
                <div class="card-headline-id">
                <h2 id="pokemon-id">${id}</h2>
                </div>
            </div>
            <div class="types card-types">
                <p>Type 1: ${allPokemon['types'][0]['type']['name'].charAt(0).toUpperCase() + allPokemon['types'][0]['type']['name'].slice(1)}</p>
                ${type2Html}
            </div>
            <div class="image-container">
                <img id="pokemon-image" src="${allPokemon['sprites']['other']['dream_world']['front_default']}" alt="${allPokemon.name}">
            </div>
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

/**
 * Renders a simplified HTML card for a Pokémon in the main Pokédex container. It includes the Pokémon's name, ID,
 * types, and an image. If the Pokémon has a second type, it is also displayed. The background color of the card
 * corresponds to the Pokémon's primary type. Each card is clickable, which triggers the detailed Pokémon view.
 * @param {string} pokemonType - The primary type of the Pokémon, used to set the card's background color.
 * @param {string} bgColor - The background color corresponding to the Pokémon's primary type.
 * @param {number} id - The ID of the Pokémon.
 * @param {Object} allPokemon - An object containing all the details of the Pokémon.
 */
function renderPokedexHTML(pokemonType, bgColor, id, allPokemon) {
    let mainContainer = document.getElementById('main-container');
    let type2Html = allPokemon['types'][1] ? `<p>Type 2: ${allPokemon['types'][1]['type']['name'].charAt(0).toUpperCase() + allPokemon['types'][1]['type']['name'].slice(1)}</p>` : '';
    mainContainer.innerHTML += /*html*/ `
        <div class="pokemon" style="background-color: ${bgColor};" onclick="showPokemonCard(${allPokemon['id']})">
            <div class="headline">
                <h1>${allPokemon['name'].charAt(0).toUpperCase() + allPokemon['name'].slice(1)}</h1>
                <div class="headline-id">
                    <h3>${id}</h3>
                </div>
            </div>
            <div class="types">
                <p>Type 1: ${pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)}</p>
                ${type2Html}
            </div>
            <img src="${allPokemon['sprites']['other']['dream_world']['front_default']}" alt="${allPokemon.name}">
        </div>`;
}