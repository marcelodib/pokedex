/*===============================IMPORT MODULES===============================*/
const { check, validationResult } = require('express-validator'); /*Modulo responsável por fazer a validação dos dados que chegam nas requisições.*/
/*============================================================================*/

/*===============================PROJECT ROUTES===============================*/
module.exports = function (app) {

/*===============================CREATE POKEMON===============================*/
    /** 
     * =======================================================================
     * |Route createPokemon responsável por verificar se o usuário possuí    |
     * |sessão aberta para acessar essa rota.                                |
     * |Caso as condições sejam verdadeiras, retorna a pagina de criação de  |
     * |pokemon, caso contrário, retorna a pagina de sign In.                |
     * =======================================================================
    */
    app.get('/createPokemon', function (req, res) {
        /*Verificação se o usuário possui sessão aberta para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Renderiza tela de criação de projeto.*/
            return res.render("./pokemon/createPokemon");
        }
        else{
            /*Redirecionamento para página de sigIn, pois não possui permissão de acesso.*/
            return res.redirect("/signIn");
        }
    });

    /** 
     * =======================================================================
     * |Route createPokemon responsável por verificar se o usuário possuí    |
     * |sessão aberta para acessar essa rota.                                |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados   |
     * |são validos, e realiza o cadastro do pokemon, caso contrario,        |
     * |retorna erro.                                                        |
     * =======================================================================
    */
    app.post('/createPokemon', 
    [
        check('Number'       , 'Número do Pokemon inválido!' ).not().isEmpty().escape().isString().isLength({ min:3 }),
        check('Name'         , 'Nome do Pokemon inválido!'   ).not().isEmpty().escape().isString().isLength({ max: 64 }),
        check('Generation'   , 'Geração do Pokemon inválido!').not().isEmpty().escape().isString().isLength({ max: 64 }),
        check('Types'        , 'Nome do Projeto inválido!'   ).not().isEmpty().isArray(),
        check('NumberAttacks', 'Nome do Projeto inválido!'   ).not().isEmpty().isInt()
    ], 
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da resposta.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller parar realizar a inserção do novo pokemon.*/
                app.src.controllers.pokemon.createPokemon(app, req, res);
            }
        }
        else {
            /*Envio da resposta.*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

/*=================================LIST POKEMON===============================*/
    /** 
     * =======================================================================
     * |Route listPokemon responsável por verificar se o usuário possuí      |
     * |sessão aberta para acessar essa rota.                                |
     * |Caso as condições sejam verdadeiras, retorna a pagina de listagem de |
     * |pokemons, caso contrário, retorna a pagina de sign In.               |
     * =======================================================================
    */
    app.get('/listPokemon', function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Renderiza tela de listagem de projetos.*/
            return res.render("./pokemon/listPokemon");
        }
        else{
            /*Redirecionamento para página de sigIn, pois não possui permissão de acesso.*/
            return res.redirect("/signIn");
        }
    });

    /** 
     * ========================================================================
     * |Route listPokemon responsável por verificar se o usuário possuí       |
     * |sessão aberta para acessar essa rota.                                 |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados    |
     * |são validos, e realiza a busca dos dados dos pokemons requisitados,   |
     * |caso contrario, retorna o erro.                                       |
     * ========================================================================
    */
    app.post('/listPokemon', function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req);
            /*Verificação se os parâmetros apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da resposta.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller parar realizar a busca dos dados dos pokemons.*/
                app.src.controllers.pokemon.listPokemon(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            return res.status(401).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

};
/*============================================================================*/
