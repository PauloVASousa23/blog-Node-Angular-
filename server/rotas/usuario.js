const express = require('express');
const router = express.Router();
const cors = require('cors');

//Config de cors
router.use(cors());

//Models
const usuario = require('../database/models/usuario');

router.post('/autenticar', async (req, res)=>{
    let resultado;
    try{
        resultado = await usuario.autenticarUsuario(req.body.email, req.body.senha);
    }catch(e){
        res.status(500).json({"error_msg": e})
    }
    res.send(resultado);
});

router.get('/', async (req, res)=>{
    try{
        let usuarios = await usuario.getUsuario();
        console.log(usuarios);
        res.json(usuarios);
    }catch(e){
        res.status(500).json({"error_msg": "Não foi possivel obter usuários, tente novamente mais tarde!"});
    }
});

router.post('/', (req, res)=>{
    let errors = [];
    if(!req.body.nome || typeof(req.body.nome) == undefined || req.body.nome == null){
        errors.push("Usuário em branco ou invalido.");
    }

    if(!req.body.email || typeof(req.body.email) == undefined || req.body.email == null){
        errors.push("E-mail em branco ou invalido.");
    }

    if(!req.body.senha || typeof(req.body.senha) == undefined || req.body.senha == null){
        errors.push("Senha em branco ou invalido.");
    }
    console.log("errors length: " + errors.length);
    if(!errors.length > 0){
        try{
            console.log("tentou gravar!");
            usuario.novoUsuario(req.body.nome, req.body.email, req.body.senha);
            res.status(200).send("Usuário cadastrado com sucesso!");
        }catch(e){
            res.status(500).json({"error_msg": "Erro ao cadastrar usuário, tente novamente mais tarde!"});
        }
    }else{
        res.status(500).json({"error_msg": errors});
    }
});

router.put('/', async (req, res)=>{
    try{
        let result = await usuario.alterarUsuario(req.body._id, req.body.email, req.body.senha, req.body.permissao);
        
        if(result){
            res.status(200).json({"success_msg": "Usuário atualizado com sucesso."});
        }else{
            res.status(500).json({"error_msg": "Problema ao atualizar usuário, id não encontrado."});
        }
    }catch(e){
        res.status(500).json({"error_msg": "Problema ao atualizar usuário, tente novamente mais tarde."});
    }
})

module.exports = router;