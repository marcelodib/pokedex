/*===============================IMPORT MODULES===================================*/
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
/*================================================================================*/

/*==============================SECRET GENERATE===================================*/
module.exports.secretGenerate = async function (userEmail) {
    /*Chamada da função que gera o secret e url de autenticação.*/
    const secret = speakeasy.generateSecret({name: `Pokedex (${userEmail})`});

    /*Chamada da função que gera o qrcode da url.*/
    const data = await qrcode.toDataURL(secret.otpauth_url);

    return {secret: secret.base32, qrcode: data};
};
/*================================================================================*/

/*================================TOKEN VERIFY====================================*/
module.exports.tokenVerify = function (secret, token) {
    /*Verificação do token enviado pelo usuário*/
    const result = speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token: token
    });

    return result;
};
/*================================================================================*/
