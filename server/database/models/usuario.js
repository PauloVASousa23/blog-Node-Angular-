const db = require('../db');

var Schema = db.conectar().Schema;

var usuarioModelSchema = new Schema({
    Nome : String,
    Email : String,
    Senha : String,
    Permissao : String
});

var usuarioModel = db.conectar().model('usuario',usuarioModelSchema);

function novoUsuario(nome, email, senha){

    var novo = new usuarioModel({Nome: nome, Email:email, Senha: senha, Permissao: "Comum"});

    return novo.save((error)=>{
        if(error){
            throw "Erro";
        }
    });
}

function getUsuario(){

    return usuarioModel.find((error,u)=>{
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

    return usuarioModel.find({Email: email, Senha: senha}).exec();

}

function alterarUsuario(id,email, senha, permissao){
    if(!email || typeof(email) == undefined || email == null){
        throw "Informe um e-mail valido.";
    }else if(!senha || typeof(senha) == undefined || senha == null){
        throw "Informe uma senha.";
    }else if(!permissao || typeof(permissao) == undefined || permissao == null){
        throw "Informe uma permissao valida.";
    }

    return usuarioModel.findOneAndUpdate({_id: id}, {_id: id, Email: email, Senha: senha, Permissao: permissao}).exec();

}

module.exports = {
    novoUsuario, 
    getUsuario,
    autenticarUsuario,
    alterarUsuario
};