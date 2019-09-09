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

