const mongoose = require('mongoose')

//Configurando o mongoose
    mongoose.connect("mongodb://localhost/aprendendo", {
        useNewUrlParser: true
    }).then(()=>{
        console.log("Conectado no banco:27017")
    }).catch((erro)=>{
        console.log("Erro: "+erro)
    })

// Model = Usuarios
//Definindo model
    const UsuarioSchema = mongoose.Schema({
        nome: {
            type: String,
            require: true
        },
        sobrenome: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        idade: {
            type: Number,
            require: true
        },
        pais: {
            type: String
        }
        
    })
//Collection
    mongoose.model('usuarios', UsuarioSchema)

    const Andre = mongoose.model('usuarios')
    new Andre({
        nome: "andre",
        sobrenome: "Nascimento",
        email: "andere@dsfe.com",
        idade: 19,
        pais: "Brasil"
    }).save().then(()=>{
        console.log("Usuario cadastrado")
    }).catch((erro)=>{
        console.log("Erro " + erro)
    })
