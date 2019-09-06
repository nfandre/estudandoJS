const express = require("../expressModulo/node_modules/express");
const app = express();


app.get("/", function(req, res){
  res.sendFile(__dirname + "/html/index.html")
})

app.get("/sobre", function(req, res){
  res.sendFile(__dirname + "/html/sobre.html")
})

app.get("/blog", function(req, res){
  res.send("Minha pagina sobre");
})

app.get("/ola/:cargo/:nome", function(req, res){
  res.send("<h1> ola " + req.params.nome + " você é mesmo " + req.params.cargo + "?<h1>");
})


app.listen(8082, function(){
  console.log("Servidor rodando na url http://localhost:8082/");
})
