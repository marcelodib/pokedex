/*===============================IMPORT MODULES===================================*/
const axios = require('axios');
/*================================================================================*/

/*===============================IMPORT MODULES===================================*/
module.exports.getPokemons = async function () {
    /*Chamada da função que recupera os pokemons.*/
    const response = await axios.get("https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json");
    const pokemons = response.data;
    return pokemons;
}
/*================================================================================*/
