const db = require('../db');
const mongoose = require('mongoose');
const usuario = require('./usuario');

var Schema = db.conectar().Schema;

var postagemModelSchema = new Schema({
    Id : String,
    Titulo : String,
    Imagem : String,
    Conteudo : String,
    Data : String,
    Autor : {id: String, nome: String}, 
    Like : [String], 
    Deslike : [String], 
});

var postagemModel = db.conectar().model('postagem',postagemModelSchema);

function novaPostagem(titulo, imagem, conteudo, autor){

    usuario.getUsuario(autor).then(u=>{
        console.log(u);
        var postagem = new postagemModel({
            Titulo: titulo,
            Imagem : imagem,
            Conteudo : conteudo,
            Data : Date.now(),
            Autor : {id: u._id, nome: u.Nome},
            Like: [],
            Deslike: []
        });
    
        postagem.save((err)=>{
            if(err){
                throw "Erro ao cadastrar postagem, tente novamente mais tarde."
            }
        });
    });

    
}

function getPostagens(){
    return postagemModel.find((err,data)=>{
        if(err) throw "Erro ao obter postagens, tente novamente mais tarde."

        postagens = data;
    }).exec();
}

function getPostagensAutor(id){
    return postagemModel.find({"Autor.id": id},(err,data)=>{
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

function avaliarPostagem(id, acao, remover, usuario){
    
    postagemModel.findOne({_id: mongoose.Types.ObjectId(id)}).then(x=>{
        let avaliacao;
        if(acao){
            if(!remover){
                avaliacao = {$push: { Like: [usuario] }}
            }else{
                avaliacao = {$pullAll: { Like: [usuario] }}
            }
        }else{
            if(!remover){
                avaliacao = {$push: { Deslike: [usuario] }}
            }else{
                avaliacao = {$pullAll: { Deslike: [usuario] }}
            }
        }

        return postagemModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, avaliacao).exec();
    });
}

function likePostagem(id){
    postagemModel.findOne({_id: mongoose.Types.ObjectId(id)}).then(x=>{
        return postagemModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {Like: x.Like+1, $push: { Usuarios: 'novo' }}).exec();
    });
}

function deslikePostagem(id){
    postagemModel.findOne({_id: mongoose.Types.ObjectId(id)}).then(x=>{
        return postagemModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {Deslike: x.Deslike+1}).exec();
    });
}

function removerLikePostagem(id){
    postagemModel.findOne({_id: mongoose.Types.ObjectId(id)}).then(x=>{
        return postagemModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {Like: x.Like-1}).exec();
    });
}

function removerDeslikePostagem(id){
    postagemModel.findOne({_id: mongoose.Types.ObjectId(id)}).then(x=>{
        return postagemModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {Deslike: x.Deslike-1}).exec();
    });
}

module.exports = {
    novaPostagem,
    getPostagens,
    getPostagensAutor,
    getPostagem,
    alterarPostagem,
    excluirPostagem,
    avaliarPostagem,
    likePostagem,
    deslikePostagem,
    removerLikePostagem,
    removerDeslikePostagem
};