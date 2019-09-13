if(process.env.NODE.ENV == "production"){
    module.exports = {mongoURI: "mongodb+srv://nfandre:And12385@cluster0-e2mi1.mongodb.net/test?retryWrites=true&w=majority"}
}else{
    module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}