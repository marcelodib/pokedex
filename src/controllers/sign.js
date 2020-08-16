/*===============================IMPORT MODULES===============================*/
const bcrypt = require('bcryptjs');         /*Modulo responsável por gerar o hash da senha do usuário.*/
const { isError } = require('util');
/*============================================================================*/

/*==============================SIGN CONTROLLERS==============================*/

/*=================================SIGN IN===================================*/
/**
 * ==================================================================
 * |Controller signIn responsável por buscar o usuário solicitado.  |
 * |Caso exista, é calculado o Hash da senha e comparado com a      |
 * |registrada, estando tudo de correto, a sessão é aberta.         |
 * ==================================================================
 */
module.exports.signIn = async function (app, req, res) {
	try {
		/*Atribuição dos dados enviados na requisição.*/
		const userInfo = req.body;

		/*Chamada o service que realiza a busca por usuários.*/
		const user = await app.src.services.user.selectUser(userInfo.userEmail);

		/*Verificação se o hash da senha enviada confere com a registrada*/
		if (bcrypt.compareSync(userInfo.userPassword, user.userPassword) && app.src.utils.auth.tokenVerify(user.secret, userInfo.token)) {

			/*Criação da session do usuario.*/
			req.session.idUser    = user._id;
			req.session.userName  = user.userName
			req.session.userEmail = user.userEmail;
			req.session.userPhone = user.userPhone;

			/*Chamada da função que torna o objeto user imutável.*/
			Object.freeze(req.session);

			/*Envio da resposta.*/
			return res.status(200).send({status: "success", msg: "Bem Vindo!"});
		} 
		else {
			/*Envio da resposta.*/
			return res.status(400).send({status: "error", msg: "Email ou senha inválido!"});
		}
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "signIn");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao tentar autenticar o usuário!"});
	}
}
/*============================================================================*/

/*==================================SIGN UP===================================*/
/**
 * ================================================================
 * |Controller signUp responsável por calcular o Hash da         |
 * |senha enviada, e realizar a inserção do novo usuário no      |
 * |banco de dados.                                              |
 * ================================================================
 */
module.exports.signUp = async function (app, req, res) {

	try {
		/*Atribuição dos dados enviados no corpo da requisição.*/
		const user = req.body;

		const auth = await app.src.utils.auth.secretGenerate(user.userEmail);

		user.secret = auth.secret;
		
		/*Chamada da função que realiza o calculo do Hash.*/
		user.userPassword = bcrypt.hashSync(user.userPassword, 11);

		/*Chamada do service que realiza o cadastro de um novo usuário.*/
		await app.src.services.user.insertUser(user)

		/*Envio da resposta.*/
		return res.status(200).send({status: "success", msg: "Usuário foi criado com sucesso!", data: auth.qrcode});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "signUp");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao tentar cadastrar o usuário!"});
	}
}
/*============================================================================*/

/*============================================================================*/

