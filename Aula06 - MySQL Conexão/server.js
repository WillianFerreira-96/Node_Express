//npm install --save mysql2
//Incluindo o módulo Express na aplicação
const express = require('express')
//Instanciando o express
const app = express()
//Middleware concede acesso ao objeto de solicitação-resposta
app.use(express.urlencoded({extended: true}))
//Importar o drivers do Mysql
const mysql = require('mysql2')

//------------------------------------------------------------------------------------------------------------
//Configurar conexão com o Banco de dados
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'my_first_db'
  });

//Conectar ao banco de dados
db.connect(err =>{
    if(err){
      console.error('Erro ao conectar ao banco de dados:', err);
    }else{
      console.log('Conectado ao banco de dados MySQL.');
    }
  })

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
    var {form_nome, form_pass} = req.body
    var txtRes = `<p>Seu nome é <strong>${form_nome}</strong></p>`
    txtRes+= `<p>E a senha cadastrada foi <strong>${form_pass}</strong></p>`
    res.send(txtRes)
})

//------------------------------------------------------------------------------------------------------------
//O app.listen deve ser a ultima linha do codigo
const port = 3003
app.listen(port, ()=>{
    console.log(`O Servidor Express está rodando na porta http://localhost:${port}`)
})