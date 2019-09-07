const Sequelize = require('../../expressModulo/node_modules/sequelize');

  //Conexão com banco de dados mysql
  const sequelize = new Sequelize('postapp','root','415263',{
    host:"localhost",
    dialect: 'mysql'
  })


  module.exports = {
      Sequelize: Sequelize,
      sequelize: sequelize
  }