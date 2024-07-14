const form = document.querySelector('form');
const resposta = document.getElementById('resposta');

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const nomeProc = document.getElementById('nomeProc').value;
  const url = '/consultar'

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nomeProc })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao buscar Criminoso(a).');
    }
    return response.json();
  })
  .then(data => {
    var txtResposta = ''
        txtResposta += `<p name="busca_id">Código do Criminoso(a): ${data.id_db}</p>`
        txtResposta += `<p name="busca_nome">Nome do(a) Meliante: ${data.nome_db}</p>`
        txtResposta += `<p name="busca_status">Situação criminal: ${data.status_db}</p>`
        txtResposta += `<p name="busca_fone">Telefone do Larápio(a): ${data.telefone_db}</p>`
        txtResposta += `<p name="busca_email">E-mail do Infrator(a): ${data.email_db}</p>`
        resposta.innerHTML = txtResposta
        document.getElementById('edit_delet').style.display="inline-block"
        
        
        addEventListener('submit',(event)=>{
          event.preventDefault()
        })
  })
  .catch(error => {
    console.error('Erro ao buscar criminoso:', error);
    resposta.innerHTML = `<p>Criminoso não encontrado. Nome Inválido.</p>`;
  });
});


