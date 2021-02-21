const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

//Config de cors
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.options('*', cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
const usuarioRota = require('./rotas/usuario');
const postagensRota = require('./rotas/postagem');

app.use('/usuario', usuarioRota);
app.use('/postagem', postagensRota);

app.use('/teste', (req, res)=>{
    res.send("teste");
});

app.listen(port, ()=>{
    console.log("Escutando na porta: " + port);
})