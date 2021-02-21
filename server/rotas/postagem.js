const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

//Models
const postagem = require('../database/models/postagem');

router.get('/',(req, res)=>{
    postagem.getPostagens().then(data=> res.send(data));
});

router.post('/',(req, res)=>{
    postagem.novaPostagem("Primeira","/","Conteudo da postagem", "Paulo");
    res.send('Postagem');
});

module.exports = router;