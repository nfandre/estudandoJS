const Sequelize = require('../expressModulo/node_modules/sequelize');
const sequelize = new Sequelize('test','root','415263',{
    host:"localhost",
    dialect: 'mysql'
} )


sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso")
}).catch(function(erro){
    console.log("falha "+ erro)
})

// Postagem

const Postagem = sequelize.define('postagens', {
    titulo: {
        type:Sequelize.STRING
    } ,
    conteudo: {
        type: Sequelize.TEXT
    }
})
//Postagem.sync({force: true});
/*
Postagem.create({
    titulo: "Um titulo",
    conteudo: "Um conteudo qualquer"
})
*/
//usuario
const Usuario = sequelize.define('usuarios', {
    nome:{
        type: Sequelize.STRING
    },
    sobrenome:{
        type: Sequelize.STRING
    },
    idade:{
        type:Sequelize.INTEGER
    },
    email:{
        type:Sequelize.STRING
    }
})
//Usuario.sync({force: true});
Usuario.create({
  nome: "Andre",
  sobrenome: "Nascimento",
  idade: 13,
  email: "andrelve.dfaesfda"
})
