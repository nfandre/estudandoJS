const express = require("../expressModulo/node_modules/express");
const app = express();
const handlebars = require('../expressModulo/node_modules/express-handlebars')
const bodyParser = require('../expressModulo/node_modules/body-parser')

//Config
  //Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
  //BodyParser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

//Rotas
app.get('/cadastro', function(req, res){
    res.render('formulario')
    //res.send("teste")
})

app.post('/add', function(req,res){
  res.send("Texto: " + req.body.titulo + " Conteudo: " + req.body.conteudo)
})


app.listen(8082, function(){
  console.log("Servidor rodando na url http://localhost:8082/");
})
