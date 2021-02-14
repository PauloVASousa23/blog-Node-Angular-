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

async function autenticarUsuario(email, senha){
    if(!email || typeof(email) == undefined || email == null){
        throw "Informe um e-mail valido.";
    }else if(!senha || typeof(senha) == undefined || senha == null){
        throw "Informe uma senha.";
    }

    let resultado;

    await usuarioModel.find({Email: email, Senha: senha}).then((result)=>{
        resultado = result;
    }).catch((error) =>{
        throw "Não foi possivel autenticar o usuário.";
    });

    return resultado;
    
}

function alterarUsuario(id,email, senha, permissao){
    if(!email || typeof(email) == undefined || email == null){
        throw "Informe um e-mail valido.";
    }else if(!senha || typeof(senha) == undefined || senha == null){
        throw "Informe uma senha.";
    }else if(!permissao || typeof(permissao) == undefined || permissao == null){
        throw "Informe uma permissao valida.";
    }

    usuarioModel.findOneAndUpdate({_id: id}, {_id: id, Email: email, Senha: senha, Permissao: permissao}).
        then((result)=>{
            console.log(result);
        }).
        catch((error)=>{
            throw "Erro ao atualizar usuario, tente novamente mais tarde.";
        });
}

module.exports = {
    novoUsuario, 
    getUsuario,
    autenticarUsuario,
    alterarUsuario
};