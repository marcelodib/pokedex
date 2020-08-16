/*===============================IMPORT MODULES===================================*/
const users = require("../schemas/user");
/*================================================================================*/

/*===============================USER SERVICES====================================*/

/*================================INSERT USER=====================================*/
module.exports.insertUser = async function (user) {
    /*Chamando o model responsável pela inserção de usuário.*/
    const result = await users.insertMany(user);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "insertUser", error: result};
    }
}
/*================================================================================*/

/*================================SELECT USER=====================================*/
module.exports.selectUser = async function (userEmail) {
    /*Chamando o model responsável pela busca de usuários.*/
    const result = await users.findOne({userEmail: userEmail});
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "selectUser", error: result};
    }
}
/*================================================================================*/

/*================================================================================*/
