const db = require('../db');
const mongoose = require('mongoose');

var Schema = db.conectar().Schema;

var usuarioModelSchema = new Schema({
    Foto : String,
    Nome : String,
    Email : String,
    Senha : String,
    Descricao : String,
    Permissao : String
});

var usuarioModel = db.conectar().model('usuario',usuarioModelSchema);

function novoUsuario(nome, email, senha){

    var novo = new usuarioModel({Foto: "", Nome: nome, Email:email, Descricao: "", Senha: senha, Permissao: "Comum"});

    return novo.save((error)=>{
        if(error){
            throw "Erro";
        }
    });
}

function getUsuarios(){

    return usuarioModel.find((error,u)=>{
        if(error){
            throw "Erro";
        }
    }).exec();
}

function getUsuario(id){

    return usuarioModel.findOne({_id: mongoose.Types.ObjectId(id)},(error,u)=>{
        if(error){
            throw "Erro";
        }
    }).exec();

}

function autenticarUsuario(email, senha){
    if(!email || typeof(email) == undefined || email == null){
        throw "Informe um e-mail valido.";
    }else if(!senha || typeof(senha) == undefined || senha == null){
        throw "Informe uma senha.";
    }

    return usuarioModel.findOne({Email: email, Senha: senha}).exec();

}

function alterarUsuario(id, nome, email, descricao){
    return usuarioModel.findOneAndUpdate({_id: id}, {Nome: nome, Email: email, Descricao: descricao}).exec();
}

function alterarFoto(id, foto){
    return usuarioModel.findOneAndUpdate({_id: id}, {Foto: foto}).exec();
}

module.exports = {
    novoUsuario, 
    getUsuario,
    getUsuarios,
    autenticarUsuario,
    alterarUsuario,
    alterarFoto
};