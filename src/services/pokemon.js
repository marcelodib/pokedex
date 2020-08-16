/*===============================IMPORT MODULES===================================*/
const pokemons = require("../schemas/pokemon");
/*================================================================================*/

/*=============================POKEMON SERVICES===================================*/

/*==============================INSERT POKEMON====================================*/
module.exports.insertPokemon = async function (pokemon) {
    /*Chamando o model responsável pela inserção de pokemons.*/
    const result = await pokemons.insertMany(pokemon);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "insertPokemon", error: result};
    }
}
/*================================================================================*/

/*===============================SELECT POKEMON===================================*/
module.exports.selectPokemons = async function () {
    /*Chamando o model responsável pela busca de pokemons.*/
    const result = await pokemons.find({});
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "selectPokemons", error: result};
    }
}
/*================================================================================*/

/*================================================================================*/
