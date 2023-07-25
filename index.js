const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector('#spinner');

let limit = 8;
let offset = 1;


function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`) //link de la poke api
        .then(res => res.json())
        .then((data) => {
            createPokemon(data);
            spinner.style.display = "none";
        })
    //.then(data => console.log(data)) //mostrar resultado en consola
}

function fetchPokemons(offset,limit) {
   spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
        //spinner.style.display = "block";
        fetchPokemon(i-1);
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

fetchPokemon(offset,limit);