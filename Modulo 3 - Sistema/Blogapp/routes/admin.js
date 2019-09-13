const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/postagens")
const Postagem = mongoose.model("postagens")
const {eAdmin}= require("../helpers/eadmin")


//GRUPO DE ROTAS ADMISTRATIVAS
router.get('/categorias', eAdmin,(req, res) =>{
    Categoria.find().sort({date: 'desc'}).then((categorias) =>{
        res.render("admin/categorias", {categorias: categorias})
    }).catch((err)=>{
        req.flash("error_msg","houve um erro ao listar as categorias" )
        res.redirect("/admin")
    })

})

router.get('/categorias/add',  eAdmin, (req, res) =>{
    res.render("admin/addcategorias")
})

router.post('/categorias/nova', eAdmin, (req,res) =>{
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
            res.redirect("/admin/categorias")
        })
    }
})

router.get("/categorias/edit/:id", eAdmin, (req,res)=>{
    Categoria.findOne({_id: req.params.id}).then((categoria)=>{
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err)=>{
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit",  eAdmin,(req,res)=>{
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

router.post("/categorias/deletar",  eAdmin, (req,res)=>{
    Categoria.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "categoria exluida com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err)=>{
        req.flash("error_msg", "houve um erro ao exluir a categoria")
        res.redirect("/admin/categorias")
    })
})

router.get("/postagens",  eAdmin, (req,res)=>{
    Postagem.find().populate("categoria").sort({date: "desc"}).then((postagens)=>{
        res.render("admin/postagens", {postagens: postagens})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar as postagens")
        req.redirect("/admin")
    })

})

router.get("/postagens/add",  eAdmin, (req,res)=>{
    Categoria.find().sort({nome: -1}).then((categorias)=>{
        res.render("admin/addpostagem", {categorias: categorias})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao carregar o formulários")
        res.redirect("/admin/postagens")
    })

})


router.post("/postagens/nova", eAdmin, (req,res)=>{
    var erros = []

    if(req.body.id =="0"){
        erros.push({texto: "Categoria inválida, registre uma categoria"})
    }

    if(erros.length>0){
        res.render("admin/addpostagens", {erros: erros})
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }
    
        new Postagem(novaPostagem).save().then(()=>{
            req.flash("success_msg", "Postagem cadastrada com sucesso")
            res.redirect("/admin/postagens")
        }).catch((erro)=>{
            req.flash("error_msg", "Houve um erro ao salvar a postagem. Tente novametne")
            console.log("erro " + erro)
            res.redirect("/admin/postagens")
        })

    }
})


router.get("/postagens/edit/:id",  eAdmin,(req,res)=>{
    Postagem.findOne({_id: req.params.id}).then((postagem)=>{
        Categoria.find().then((categorias)=>{
            res.render("admin/editpostagens", {categorias: categorias, postagem: postagem})
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro ao carregar categorias")
            res.redirect("/admin/postagens")
        })

    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao carregar o formulário de edição")
        res.redirect("/admin/postagens")
    })
})

router.post("/postagem/edit",  eAdmin,(req,res)=>{
    Postagem.findOne({_id: req.body.id}).then((postagem)=>{
        
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria

        postagem.save().then(()=>{
            req.flash("success_msg", "postagem edita com sucesso")
            res.redirect("/admin/postagens")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da postagem")
        })

    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar a postagem")
        res.redirect("/admin/postagens")
    })
})

router.get('/postagens/deletar/:id', eAdmin, (req,res)=>{
    Postagem.remove({_id: req.params.id}).then(()=>{
        req.flash("success_msg", "postagem deletada com sucesso")
        res.redirect("/admin/postagens")
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/admin/postagens")
    })
})
module.exports = router