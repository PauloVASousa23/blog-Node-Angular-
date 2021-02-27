const express = require('express');
const router = express.Router();
const cors = require('cors');
const multiparty = require('connect-multiparty');
const fileStream = require('fs');

const multipartyPath = multiparty({uploadDir: './arquivos'});
router.use(cors());

//Models
const postagem = require('../database/models/postagem');

function convertToBase64(nomeArquivo){
    let base64 = fileStream.readFileSync(__dirname.replace('rotas','')+ 'arquivos\\'+ nomeArquivo);

    return new Buffer(base64).toString('base64');
}

router.post('/upload/Arquivo', multipartyPath, (req, res, next)=>{
    let errors = [];
    if(!req.body.titulo || typeof(req.body.titulo) == undefined || req.body.titulo == null){
        errors.push("Titulo em branco ou invalido.");
    }

    if(!req.files.imagem.path || typeof(req.files.imagem.path) == undefined || req.files.imagem.path == null){
        errors.push("Imagem em branco ou invalido.");
    }

    if(!req.body.conteudo || typeof(req.body.conteudo) == undefined || req.body.conteudo == null){
        errors.push("Conteudo em branco ou invalido.");
    }

    if(!req.body.autor || typeof(req.body.autor) == undefined || req.body.autor == null){
        errors.push("Autor em branco ou invalido.");
    }

    if(!errors.length > 0){
        let nomeArquivo = req.files.imagem.path.replace('arquivos\\', '');

        postagem.novaPostagem(req.body.titulo, nomeArquivo, req.body.conteudo, req.body.autor);
        
        var options = {
            root: __dirname.replace('rotas','')+ 'arquivos',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true,
                'Autor': 'Paulo'
            }
        }

        res.status(200).json("Postagem cadastrada com sucesso!");
    }else{
        res.status(500).json({"error_msg": errors});
    }
});

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

router.get('/imagem/:id',(req, res)=>{
    if(req.params.id){
        try{
            var options = {
                root: __dirname.replace('rotas','')+ 'arquivos',
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            }

            res.sendFile(req.params.id, options, function (err) {
                if (err) {
                  next(err);
                }
            });

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
            postagem.excluirPostagem(req.params.id).then(data=> res.json("Postagem deletada com sucesso!")).catch(e=> console.log("Erro: " + e));
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

router.post('/like', (req, res)=>{
    let errors = [];
    if(!req.body.id || typeof(req.body.id) == undefined || req.body.id == null){
        errors.push("Id em branco ou invalido.");
    }
    
    if(!errors.length > 0){
        postagem.likePostagem(req.body.id);
        res.status(200).json("like enviado com sucesso!");
    }else{
        res.status(500).json({"error_msg": errors});
    }
});

router.post('/deslike', (req, res)=>{
    let errors = [];
    if(!req.body.id || typeof(req.body.id) == undefined || req.body.id == null){
        errors.push("Id em branco ou invalido.");
    }
    
    if(!errors.length > 0){
        postagem.deslikePostagem(req.body.id);
        res.status(200).json("deslike enviado com sucesso!");
    }else{
        res.status(500).json({"error_msg": errors});
    }
});

module.exports = router;