const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

//Models
const postagem = require('../database/models/postagem');

router.get('/',(req, res)=>{
    postagem.getPostagens().then(data=> res.json(data));
});

router.get('/:id',(req, res)=>{
    if(req.params.id){
        try{
            postagem.getPostagem(req.params.id).then(data=> res.json(data)).catch(e=> console.log("Erro: " + e));
        }catch(e){
            res.status(500).json("Erro ao obter postagem, tente novamente mais tarde.");
        }
    }else{
        res.status(500).json("Id invalido ou nulo");
    }
});

router.delete('/:id',(req, res)=>{
    if(req.params.id){
        try{
            postagem.excluirPostagem(req.params.id).then(data=> res.json("Postagem deletada com sucesso!").catch(e=> console.log("Erro: " + e));
        }catch(e){
            res.status(500).json("Erro ao excluir postagem, tente novamente mais tarde.");
        }
    }else{
        res.status(500).json("Id invalido ou nulo");
    }
});

router.post('/',(req, res)=>{
    let errors = [];
    if(!req.body.titulo || typeof(req.body.titulo) == undefined || req.body.titulo == null){
        errors.push("Titulo em branco ou invalido.");
    }

    if(!req.body.imagem || typeof(req.body.imagem) == undefined || req.body.imagem == null){
        errors.push("Imagem em branco ou invalido.");
    }

    if(!req.body.conteudo || typeof(req.body.conteudo) == undefined || req.body.conteudo == null){
        errors.push("Conteudo em branco ou invalido.");
    }

    if(!req.body.autor || typeof(req.body.autor) == undefined || req.body.autor == null){
        errors.push("Autor em branco ou invalido.");
    }

    if(!errors.length > 0){
        postagem.novaPostagem(req.body.titulo,req.body.imagem,req.body.conteudo, req.body.autor);
        res.status(200).json("Postagem cadastrada com sucesso!");
    }else{
        res.status(500).json({"error_msg": errors});
    }
});

router.put('/',(req, res)=>{
    let errors = [];
    if(!req.body.id || typeof(req.body.id) == undefined || req.body.id == null){
        errors.push("Id em branco ou invalido.");
    }

    if(!req.body.titulo || typeof(req.body.titulo) == undefined || req.body.titulo == null){
        errors.push("Titulo em branco ou invalido.");
    }

    if(!req.body.imagem || typeof(req.body.imagem) == undefined || req.body.imagem == null){
        errors.push("Imagem em branco ou invalido.");
    }

    if(!req.body.conteudo || typeof(req.body.conteudo) == undefined || req.body.conteudo == null){
        errors.push("Conteudo em branco ou invalido.");
    }

    if(!req.body.autor || typeof(req.body.autor) == undefined || req.body.autor == null){
        errors.push("Autor em branco ou invalido.");
    }

    if(!errors.length > 0){
        postagem.alterarPostagem(req.body.id, req.body.titulo,req.body.imagem,req.body.conteudo, req.body.autor);
        res.status(200).json("Postagem alterada com sucesso!");
    }else{
        res.status(500).json({"error_msg": errors});
    }
});

module.exports = router;