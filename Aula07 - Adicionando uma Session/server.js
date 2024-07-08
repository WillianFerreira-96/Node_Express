//npm install express-session
const express = require('express')
const app = express()
const mysql = require('mysql2')
const session = require('express-session')

// Configurar sessão
app.use(session({
    secret: 'sua-chave-secreta', // Use uma chave secreta forte e segura
    resave: true, // false: Não salvar a sessão se ela não foi modificada
    saveUninitialized: true, // false: Não criar uma sessão para requisições que não possuem sessão
    cookie: { secure: false } // Para desenvolvimento, 'false'. Para produção, 'true' com HTTPS.
  }))

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

app.use(express.urlencoded({extended: true}))

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

    // Salvar dados na sessão
    req.session.nome = nome;
    
    //Redirecionar
    res.redirect('/usuario')    
})

//Rota Consultar
app.post('/consultar',(req, res)=>{
    //Chamar variaveis da Session
    var session_nome = req.session.nome
    
    //Ação do banco de dados
    var sql = 'SELECT * FROM usuario WHERE nome = ?'
    //Conexão e execução do banco de dados
    db.query(sql, [session_nome],(err, result)=>{
        //Recebe e separa os dados
        const usuario = result[0]
        const id = usuario.id
        const nome = usuario.nome
        const senha = usuario.senha

        //Organiza em JSON
        /*const dados = {
            id,
            nome,
            senha
        }*/

        //Mostra na tela o Objeto
        req.session.id = id
        req.session.nome = nome
        req.session.senha = senha
        console.log(`ID: ${req.session.id}, Nome: ${req.session.nome}, Senha: ${req.session.senha}`)
        res.redirect('/usuario')
    })

    //encerrar session
    /*req.session.destroy(() => {
        console.log('Sessão Finalizada!')
    })*/
})

//------------------------------------------------------------------------------------------------------------
const port = 3006
app.listen(port, ()=>{
    console.log(`Servidor está disponivel em: http://localhost:${port}`)
})