//npm install --save mysql2
//Incluindo o módulo Express na aplicação
const express = require('express')
//Instanciando o express
const app = express()
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
db.connect(()=>{
    console.log('Banco de Dados MySQL Conectado ao Servidor')
})

//------------------------------------------------------------------------------------------------------------
//Definição de Rotas


//Middleware concede acesso ao objeto de solicitação-resposta
app.use(express.urlencoded({extended: true}))

//Rota Raiz
app.get('/',(req, res)=>{
    res.sendFile(__dirname + "/MyProject/index.html")
    //__dirname é uma variavel do express que retorna o diretório da pasta raiz do projeto
})

//Rota POST
app.post('/usuario',(req, res)=>{
    //Essas variaveis se referem ao name (ex: name="form_nome") dado no input no html
    var nome = req.body.form_nome
    var senha = req.body.form_pass
    
    var sql = 'INSERT INTO new_user(nome, senha) VALUES(?, ?)'
    db.query(sql, [nome, senha])

    res.send('Dados Cadastrados com Sucesso')
})

//------------------------------------------------------------------------------------------------------------
//O app.listen deve ser a ultima linha do codigo
const port = 3006
app.listen(port, ()=>{
    console.log(`Servidor está disponivel em: http://localhost:${port}`)
})