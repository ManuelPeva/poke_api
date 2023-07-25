const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector('#spinner');
const previus = document.querySelector('#previus');
const next = document.querySelector('#next');

let limit = 12;
let offset = 0;

previus.addEventListener('click', () => {
    if(offset >= limit){
        offset -= limit;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);

    }
   
});

next.addEventListener('click', () => {
    offset += limit;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit)
});


function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`) //link de la poke api
        .then(res => res.json())
        .then((data) => {
            createPokemon(data);
            spinner.style.display = "none";
        })
        .catch(error => console.log("Error fetching Pokemon",error));
    //.then(data => console.log(data)) //mostrar resultado en consola
}

function fetchPokemons(offset,limit) {
   spinner.style.display = "block";
    for (let i = offset + 1; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
}

fetchPokemons(offset,limit); //numero de pokemones en la pagina

function createPokemon(pokemon) { //creación de elementos 
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-conatiner');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default
  

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;


    const name = document.createElement('p');
    name.textContent = pokemon.name

    card.appendChild(spriteContainer); //agregarlo a la carta imagen
    card.appendChild(number); //numero
    card.appendChild(name); //nombre

    pokemonContainer.appendChild(card);
    

}

function removeChildNodes(parent){ 
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }

}

fetchPokemon(offset,limit);