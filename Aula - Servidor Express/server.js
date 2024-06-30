//npm init - y
//npm install express

//Incluindo o módulo Express na aplicação
const express = require('express')
//Instanciando o express
const app = express()

//------------------------------------------------------------------------------------------------------------
//Definição de Rotas

//Rota Raiz
app.get('/',(req, res)=>{
    res.send('Seja bem vindo ao meu Website!')
})

//Rota Sobre
app.get('/sobre',(req, res)=>{
    res.send('Minha página sobre')
})

//Rota Blog
app.get('/blog',(req, res)=>{
    res.send('Meu Blog')
})

//------------------------------------------------------------------------------------------------------------
//Rota com parâmetro

app.get('/descricao/:nome/:idade/:cargo',(req, res)=>{
    //Lembrete: A função send só pode ser chamada uma vez dentro do parametro de uma rota
    var txt_send = '<h1>Olá '+ req.params.nome +'</h1>'
    txt_send += '<p>Você tem '+ req.params.idade +' anos de idade</p>'
    txt_send += '<p>E trabalha como '+ req.params.cargo +'</p>'
    res.send(txt_send)
})

//------------------------------------------------------------------------------------------------------------

//O app.listen deve ser a ultima linha do codigo
const port = 3000
app.listen(port, ()=>{
    console.log(`O Servidor Express está rodando na porta http://localhost:${port}`)
})