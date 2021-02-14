const db = require('../db');

var Schema = db.conectar().Schema;

var usuarioModelSchema = new Schema({
    usuario : String,
    Email : String,
    Senha : String,
    Permissao : String
});

var usuarioModel = db.conectar().model('usuario',usuarioModelSchema);

function novoUsuario(){

    var novo = new usuarioModel({nome: "Paulo", Email:"paulo@email.com", Senha: "123456", Permissao: "Adm"});

    novo.save((error)=>{
        if(error){
            throw "Erro";
        }
    });
}

async function getUsuario(){
    let usuarios;
    await usuarioModel.find((error,u)=>{
        if(error){
            throw "Erro";
        }else{
            usuarios = u;
        }
    });

    return usuarios;
}

module.exports = {novoUsuario, getUsuario};