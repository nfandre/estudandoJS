const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = Schema({
    nome: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    senha:{
        type: String,
        require: true
    }
})

mongoose.models('usuarios', Usuario)