//npm init - y
//npm install express
//npm install nodemon -g
//nodemon server.js

//Incluindo o módulo Express na aplicação
const express = require('express')
//Instanciando o express
const app = express()
//Middleware concede acesso ao objeto de solicitação-resposta
app.use(express.urlencoded({extended: true}))

//------------------------------------------------------------------------------------------------------------
//Definição de Rotas

//Rota Raiz
app.get('/',(req, res)=>{
    res.sendFile(__dirname + "/MyProject/index.html")
    //__dirname é uma variavel do express que retorna o diretório da pasta raiz do projeto
})

//Rota POST
app.post('/usuario',(req, res)=>{
    //Essas variaveis se referem ao name (ex: name="form_nome") dado no input no html
    var {form_nome, form_email, form_pass} = req.body
    var txtRes = `<p>Seu nome é <strong>${form_nome}</strong></p>`
    txtRes+= `<p>Email <strong>${form_email}</strong></p>`
    txtRes+= `<p>E a senha cadastrada foi <strong>${form_pass}</strong></p>`
    res.send(txtRes)
})

//------------------------------------------------------------------------------------------------------------
//O app.listen deve ser a ultima linha do codigo
const port = 3000
app.listen(port, ()=>{
    console.log(`O Servidor Express está rodando na porta http://localhost:${port}`)
})