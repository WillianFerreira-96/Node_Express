var http = require('http')

var port= 3000
http.createServer((req,res)=>{
    res.end("Hello World! Welcome to my Website")
}).listen(port)

console.log(`O Servidor está rodando na porta http://localhost:${port}`)