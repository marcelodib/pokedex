/*===============================IMPORT MODULES===============================*/
/*============================================================================*/

/*============================PROJECT CONTROLLERS=============================*/

/*===============================CREATE PROJECT===============================*/
/**
 * ================================================================
 * |Controller createPokemon responsável por cadastrar um novo    |
 * |pokemon.                  								      |
 * ================================================================
 */
module.exports.createPokemon = async function (app, req, res) {
    try {
		/*Atribuição dos dados enviados na requisição.*/
        const pokemon = req.body;

		/*Chamada do service que realiza o cadastro de projetos.*/
        await app.src.services.pokemon.insertPokemon(pokemon);

		/*Envio da resposta.*/
		return res.status(200).send({status: "success", msg: "Pokemon criado com sucesso!"});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "createPokemon");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao inserir o pokemon!"});
	}
}
/*============================================================================*/

/*================================LIST PROJECT================================*/
/**
 * ================================================================
 * |Controller listPokemon responsável por buscar pelos pokemons  |
 * |requisitadas.                                                 |
 * ================================================================
 */
module.exports.listPokemon = async function (app, req, res) {
    try {
		/*Chamada do service que realiza a busca por projetos.*/
        const pokemons = await app.src.services.pokemon.selectPokemons();

		/*Envio da resposta.*/
		return res.status(200).send({status: "success", data: pokemons});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "listPokemon");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao buscar os pokemons!"});
	}
}
/*============================================================================*/

/*===============================DELETE PROJECT===============================*/
/**
 * ================================================================
 * |Controller deletePokemon responsável por remover um           |
 * |determinado pokemon.                                          |
 * ================================================================
 */
module.exports.deletePokemon = async function (app, req, res) {
    try {
		/*Atribuição dos dados enviados na requisição.*/
        const idProject = req.body.idProject;

		/*Chamada do service que realiza a remoção de projetos.*/
        await app.src.services.pokemon.deletePokemon(app ,idProject, req.session.idUser);

		/*Envio da resposta.*/
		return res.status(200).send({status: "success", msg: "Pokemon removido com sucesso!"});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "deletePokemon");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao deletar o pokemon!"});
	}
}
/*============================================================================*/

/*============================================================================*/

