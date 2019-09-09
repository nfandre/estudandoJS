const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req,res) =>{
    res.send("Pagina de posts")
})

router.get('/categorias', (req, res) =>{
    res.render("admin/categorias")
})

router.get('/categorias/add', (req, res) =>{
    res.render("admin/addcategorias")
})

router.post('/categorias/nova', (req,res) =>{
    console.log( req.body.nome, req.body.slug)
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(()=>{
        console.log("Cadastro efetuado")
    }).catch((erro)=>{
        console.log("erro " + erro)
    })
})
module.exports = router