const express = require("../expressModulo/node_modules/express");
const app = express();
const handlebars = require('../expressModulo/node_modules/express-handlebars')
const bodyParser = require('../expressModulo/node_modules/body-parser')
const Post = require('./models/Post')
//Config
  //Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
  //BodyParser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

//Rotas
app.get('/', function(req,res){
  Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
    res.render('home', {posts: posts})
  })


    
 
})
app.get('/cadastro', function(req, res){
    res.render('formulario')
    //res.send("teste")
})

app.post('/add', function(req,res){
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  }).then(function(){
    res.redirect('/')
  }).catch(function(erro){
    res.send("Houve um erro: " + erro)
  })
})


app.listen(8082, function(){
  console.log("Servidor rodando na url http://localhost:8082/");
})
