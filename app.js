/*===============================IMPORT MODULES===============================*/
const app = require('./config/server'); /*Modulo responsável por fazer todas as configurações do servidor.*/
/*============================================================================*/

const port = process.env.PORT || process.env.PORT_SERVER; /*Recuperando a porta onde o servidor irá ouvir*/
/*==================================SERVER ON=================================*/

/*Instanciando o servidor, ouvindo na porta 3000.*/
app.listen(port, async function () {

	const pokemons = await app.src.services.pokemon.selectPokemons();

	if (Array.isArray(pokemons) && pokemons.length === 0) {
		const newPokemons = await app.src.utils.axios.getPokemons();
		await app.src.services.pokemon.insertPokemon(newPokemons);
	}
	
	console.log('Pokedex ON!');
});
/*============================================================================*/

