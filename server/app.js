const express = require('express');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
const usuarioRota = require('./rotas/usuario');

app.use('/usuario', usuarioRota);

app.listen(port, ()=>{
    console.log("Escutando na porta: " + port);
})