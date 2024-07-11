//npm install express-session
const express = require('express')
const app = express()
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

//MiddleWare: Interpreta dados de formudario HTML
app.use(express.urlencoded({extended: true}))
//Aceitar Json
app.use(express.json())

//Rota Raiz
app.get('/',(req, res)=>{
    res.sendFile(__dirname + "/MyProject/index.html")
})

//Rota Usuario
app.get('/usuario', (req, res)=>{
    res.sendFile(__dirname + '/MyProject/usuario.html')
})

//Rota POST
app.post('/cadastrar',(req, res)=>{

    //Requisição dos dados do Frontend
    var nome = req.body.form_nome
    var senha = req.body.form_pass 
    
    //Ação do banco de dados
    var sql = 'INSERT INTO usuario(nome, senha) VALUES(?, ?)'
    //Conexão e execução do banco de dados
    db.query(sql, [nome, senha])

    //Redirecionar
    res.redirect('/usuario')    
})

//Rota Consultar
app.get('/consultar',(req, res)=>{
    const nomeConsult = req.body.nomeSearch
    //Ação do banco de dados
    const sql = 'SELECT senha FROM usuario WHERE nome = ?'
    //Conexão e execução do banco de dados
    db.query(sql, [nomeConsult],(err, result)=>{
        //Receber e separar os dados
            
        res.json(result)      
    })
})


   

   
app.get('/script', (req, res)=>{
    res.sendFile(__dirname + '/MyProject/script.js')
})


//------------------------------------------------------------------------------------------------------------
const port = 3006
app.listen(port, ()=>{
    console.log(`Servidor está disponivel em: http://localhost:${port}`)
    console.log(`Desenvolvendo em: http://localhost:${port}/usuario`)
})