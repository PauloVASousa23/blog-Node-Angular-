const db = require('../db');
const mongoose = require('mongoose');

var Schema = db.conectar().Schema;

var postagemModelSchema = new Schema({
    Id : String,
    Titulo : String,
    Imagem : String,
    Conteudo : String,
    Data : String,
    Autor : String, 
    Like : Number, 
    Deslike : Number, 
});

var postagemModel = db.conectar().model('postagem',postagemModelSchema);

function novaPostagem(titulo, imagem, conteudo, autor){

    var postagem = new postagemModel({
        Titulo: titulo,
        Imagem : imagem,
        Conteudo : conteudo,
        Data : Date.now(),
        Autor : autor,
        Like: 0,
        Deslike: 0
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

function getPostagem(id){
    return postagemModel.find({_id: mongoose.Types.ObjectId(id)}).exec();
}

function alterarPostagem(id, titulo, imagem, conteudo, autor){
    return postagemModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {Titulo: titulo, Imagem: imagem, Conteudo: conteudo, Autor: autor}).exec();
}

function excluirPostagem(id){
    return postagemModel.deleteOne({_id: mongoose.Types.ObjectId(id)}).exec();
}

function likePostagem(id){
    postagemModel.findOne({_id: mongoose.Types.ObjectId(id)}).then(x=>{
        return postagemModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {Like: x.Like+1}).exec();
    });
}

function deslikePostagem(id){
    postagemModel.findOne({_id: mongoose.Types.ObjectId(id)}).then(x=>{
        return postagemModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {Deslike: x.Deslike+1}).exec();
    });
}

module.exports = {
    novaPostagem,
    getPostagens,
    getPostagem,
    alterarPostagem,
    excluirPostagem,
    likePostagem,
    deslikePostagem
};