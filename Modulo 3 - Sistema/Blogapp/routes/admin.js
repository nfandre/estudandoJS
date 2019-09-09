const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
//GRUPO DE ROTAS ADMISTRATIVAS
router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/categorias', (req, res) =>{
    Categoria.find().sort({date: 'desc'}).then((categorias) =>{
        res.render("admin/categorias", {categorias: categorias})
    }).catch((err)=>{
        req.flash("error_msg","houve um erro ao listar as categorias" )
        res.redirect("/admin")
    })

})

router.get('/categorias/add', (req, res) =>{
    res.render("admin/addcategorias")
})

router.post('/categorias/nova', (req,res) =>{
    var erros = []

    if(!req.body.nome ||  typeof req.body.nome == undefined || req.body.nome ==null){
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.slug ||  typeof req.body.slug == undefined || req.body.slug ==null){
        erros.push({texto: "Slug inválido"})
    }

    if(req.body.nome.length <2){
        erros.push({texto: "Nome da categoria muito pequeno"})
    }

    if(erros.length >0){
        res.render("admin/addcategorias", {erros: erros})
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(()=>{
            req.flash("success_msg", "Categoria cadastrada com sucesso")
            res.redirect("/admin/categorias")
        }).catch((erro)=>{
            req.flash("error_msg", "Houve um erro ao salvar a categoria. Tente novametne")
            console.log("erro " + erro)
            res.redirect("/admin")
        })
    }
})

router.get("/categorias/edit/:id", (req,res)=>{
    Categoria.findOne({_id: req.params.id}).then((categoria)=>{
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err)=>{
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
  

})

router.post("/categorias/edit", (req,res)=>{
    Categoria.findOne({_id: req.body.id}).then((categoria)=>{
        
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(()=>{
            req.flash("success_msg", "categoria edita com sucesso")
            res.redirect("/admin/categorias")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria")
        })

    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/deletar", (req,res)=>{
    Categoria.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "categoria exluida com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err)=>{
        req.flash("error_msg", "houve um erro ao exluir a categoria")
        res.redirect("/admin/categorias")
    })
})

router.get("/postagens", (req,res)=>{
    res.render("admin/postagens")
})

router.get("/postagens/add", (req,res)=>{
    Categoria.find().sort({nome: -1}).then((categorias)=>{
        res.render("admin/addpostagem", {categorias: categorias})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao carregar o formulários")
        res.redirect("/admin/postagens")
    })

})
module.exports = router