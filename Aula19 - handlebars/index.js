const express = require("../expressModulo/node_modules/express");
const app = express();
const handlebars = require('../expressModulo/node_modules/express-handlebars')
const Sequelize = require('../expressModulo/node_modules/sequelize');

//Config
  //Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

  //Conexão com banco de dados mysql
  const sequelize = new Sequelize('test','root','415263',{
    host:"localhost",
    dialect: 'mysql'
  })

//Rotas
app.get('/cadastro', function(req, res){
    res.render('formulario')
    //res.send("teste")
})

app.post('/add', function(res, res){
  res.send("Dados recebidos")
})


app.listen(8082, function(){
  console.log("Servidor rodando na url http://localhost:8082/");
})
