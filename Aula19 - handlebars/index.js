const express = require("../expressModulo/node_modules/express");
const app = express();
const handlebars = require("../expressModulo/node_modules/express-handlebars")
const Sequelize = require('../expressModulo/node_modules/sequelize');

//Config
  //Template Engine
    app.engine('handlebars', handlebars({defaultlayot: 'main'}))
    app.set('view enine', 'handlebars')
  //Conexão com banco de dados mysql
  const sequelize = new Sequelize('test','root','415263',{
    host:"localhost",
    dialect: 'mysql'
  } )


app.listen(8082, function(){
  console.log("Servidor rodando na url http://localhost:8082/");
})
