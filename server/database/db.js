const mongoose = require('mongoose');

let cnx;

function conectar(){

    mongoose.connect('mongodb+srv://blog_user:Blog1234@cluster0.c2ler.mongodb.net/blog?retryWrites=true&w=majority', { useNewUrlParser: true });
    cnx = mongoose.connection;
    cnx.on('error',(error)=>{
        console.log('Erro ao conectar ao banco: ' + error);
    });

    return mongoose;
}

function encerrar(){
    cnx.close();
}

module.exports = {conectar, encerrar};