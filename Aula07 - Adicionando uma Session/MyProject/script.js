const resposta = document.getElementById('resposta')
//const form = document.getElementById('form')
//form.preventDefault();

function mostrar(){

    
    fetch('http://localhost:3006/consultar')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        //var txtResposta = ''
        //txtResposta += `<p>Seu ID: ${data.id}</p>`
        //txtResposta += `<p>Seu Nome: ${data.nome}</p>`
        //txtResposta += `<p>Sua Senha: ${data.senha}</p>`
        //resposta.innerHTML = data//txtResposta
    })

    
    
    
        
}