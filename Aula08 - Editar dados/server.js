//npm install express-session
const express = require('express')
const app = express()
const mysql = require('mysql2');

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
    console.log('Banco de Dados MySQL ('+ db.config.database +') Conectado ao Servidor')
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
app.get('/buscar', (req, res)=>{
    res.sendFile(__dirname + '/MyProject/buscar.html')
})

//Rota POST
app.post('/cadastrar',(req, res)=>{
    //Requisição dos dados do Frontend
    const nome = req.body.form_nome
    const status = req.body.form_status
    const fone = req.body.form_fone 
    const email = req.body.form_emal 
    
    //Ação do banco de dados
    const sql = 'INSERT INTO usuarios_db (nome_db, status_db, telefone_db, email_db) VALUES(?, ?, ?, ?)'
    //Conexão e execução do banco de dados
    db.query(sql, [nome, status, fone, email])

    //Redirecionar
    res.redirect('/buscar')    
})

//Rota Consultar
app.post('/consultar', (req, res)=>{
    //Requisição dos dados do Frontend
    const nome = req.body.nomeProc

    //Ação do banco de dados
    const sql = 'SELECT * FROM usuarios_db WHERE nome_db = ?'
    //Conexão e execução do banco de dados
    db.query(sql,[nome],(err, result)=>{
        const usuario = result[0] 

        //Enviar os dados de volta
        res.json(usuario)
    })
})

app.post('/deletar',(req, res)=>{
    const nome = req.body.confirm
    const sql = 'DELETE FROM usuarios_db WHERE nome_db = ?'
    db.query(sql, [nome])
    res.redirect('/')
})

app.post('/editar',(req, res)=>{
    const id = req.body.id_inclued
    var coluna = req.body.input_list
    const update = req.body.update
    if(coluna === "Nome"){
        coluna = "nome_db"
    }else if (coluna === "Situação") {
        coluna = "status_db"
    }else if(coluna === "Telefone"){
        coluna = "telefone_db"
    }else{
        coluna = "email_db"
    }
    
    const sql = `UPDATE usuarios_db SET ${coluna} = ? WHERE id_db = ?`
    db.query(sql,[update, id])
})


app.get('/script', (req, res)=>{
    res.sendFile(__dirname + '/MyProject/script.js')
})

app.get('/style',(req, res)=>{
    res.sendFile(__dirname + '/MyProject/style.css')
})

//------------------------------------------------------------------------------------------------------------
const port = 3006
app.listen(port, ()=>{
    console.log(`Servidor está disponivel em: http://localhost:${port}`)
    console.log(`Desenvolvendo em: http://localhost:${port}/buscar`)
})