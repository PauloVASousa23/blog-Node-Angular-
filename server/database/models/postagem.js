const db = require('../db');

var Schema = db.conectar().Schema;

var postagemModelSchema = new Schema({
    Titulo : String,
    Imagem : String,
    Conteudo : String,
    Data : String,
    Autor : String 
});

var postagemModel = db.conectar().model('postagem',postagemModelSchema);

function novaPostagem(titulo, imagem, conteudo, autor){

    var postagem = new postagemModel({
        Titulo: titulo,
        Imagem : imagem,
        Conteudo : conteudo,
        Data : Date.now(),
        Autor : autor 
    });

    postagem.save((err)=>{
        if(err){
            throw "Erro ao cadastrar postagem, tente novamente mais tarde."
        }
    });
    
}

function getPostagens(){
    return postagemModel.find((err,data)=>{
        if(err) throw "Erro ao obter postagens, tente novamente mais tarde."

        postagens = data;
    }).exec();
}

module.exports = {
    novaPostagem,
    getPostagens
};