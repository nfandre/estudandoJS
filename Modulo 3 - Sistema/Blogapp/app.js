//Carregando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require("body-parser")
    const app = express()
    const admin = require("./routes/admin") 
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require("express-session")
    const flash = require("connect-flash")
    require("./models/postagens")
    const Postagem = mongoose.model("postagens")
//Configurações
    //sessão
        app.use(session({
            secret: "qualquer coiisa",
            resave: true,
            saveUninitialized: true
        }))    
        app.use(flash())
    //middlewares
        app.use((req, res, next) =>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/blogapp", {
            useNewUrlParser: true
        }).then(()=>{
            console.log("Conectado com o mongo")
        }).catch((err)=>{
            console.log("Erro ao se conectar: " + err)
        })
    //Public
        app.use(express.static(path.join(__dirname, "public")))

//Rotas
app.get('/', (req, res) => {
    Postagem.find().populate("categoria").sort({date: "desc"}).then((postagens)=>{
        res.render("index", {postagens: postagens})
    }).catch((err)=>{
        console.log(err)
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/404")
    })
})
app.get("/postagem/:slug",(req,res)=>{
    Postagem.findOne({slug: req.params.slug}).then((postagem)=>{
        if(postagem){
            res.render("postagem/index", {postagem: postagem})
        }else{
            req.flash("error_msg", "Esta postagem não existe")
            res.redirect("/")

        }
    }).catch((err)=>{
        req.flash("erro_msg", "Houve um erro interno")
        res.redirect("/")
    })
})

app.get('/404', (req, res) => {
    res.send('Erro 404!')
})
app.use("/admin", admin)

//Outros
const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Sevidor rodando! Porta: " + 8081)
})