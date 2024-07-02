//npm init - y
//npm install express
//npm install nodemon -g
//nodemon server.js

//Incluindo o módulo Express na aplicação
const express = require('express')
//Instanciando o express
const app = express()

//------------------------------------------------------------------------------------------------------------
//Definição de Rotas

//Rota Raiz
app.get('/',(req, res)=>{
    res.sendFile(__dirname + "/MyProject/index.html")
    //__dirname é uma variavel do express que retorna o diretório da pasta raiz do projeto
})

//Rota Sobre
app.get('/sobre',(req, res)=>{
    res.sendFile(__dirname + "/MyProject/sobre.html")
    //__dirname é uma variavel do express que retorna o diretório da pasta raiz do projeto
})

//Rota Blog
app.get('/blog',(req, res)=>{
    res.sendFile(__dirname + "/MyProject/blog.html")
    //__dirname é uma variavel do express que retorna o diretório da pasta raiz do projeto
})

//------------------------------------------------------------------------------------------------------------
//O app.listen deve ser a ultima linha do codigo
const port = 3000
app.listen(port, ()=>{
    console.log(`O Servidor Express está rodando na porta http://localhost:${port}`)
})