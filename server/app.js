const express = require('express');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usuario = require('./database/models/usuario');

app.get('/usuario', async (req, res)=>{
    try{
        let usuarios = await usuario.getUsuario();
        console.log(usuarios);
        res.json(usuarios);
    }catch(e){
        res.status(500).json({"error_msg": "Não foi possivel obter usuários, tente novamente mais tarde!"});
    }

})

app.post('/usuario', (req, res)=>{
    let errors = [];
    if(req.body.nome || typeof(req.body.nome) == undefined || req.body.nome == null){
        errors.push("Usuário em branco ou invalido.");
    }

    if(req.body.email || typeof(req.body.email) == undefined || req.body.email == null){
        errors.push("E-mail em branco ou invalido.");
    }

    if(req.body.senha || typeof(req.body.senha) == undefined || req.body.senha == null){
        errors.push("Senha em branco ou invalido.");
    }
    
    if(errors.length > 0){
        try{
            usuario.novoUsuario();
            res.status(200).send("Usuário cadastrado com sucesso!");
        }catch(e){
            res.status(500).json({"error_msg": "Erro ao cadastrar usuário, tente novamente mais tarde!"});
        }
    }else{
        res.status(500).json({"error_msg": errors});
    }
})

app.listen(port, ()=>{
    console.log("Escutando na porta: " + port);
})