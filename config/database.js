// /*===============================IMPORT MODULES===============================*/
const mongoose = require('mongoose'); /*Módulo reponsável por realizar a conexão com a base de dados MySQL.*/
// /*============================================================================*/

// /*=============================DATABASE CONNECTION============================*/
/*Preencher com os dados de conexão do banco de dados.*/
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const database = process.env.DB_NAME;
const uri = `mongodb+srv://${user}:${password}@cluster0.6dyba.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});
// /*============================================================================*/