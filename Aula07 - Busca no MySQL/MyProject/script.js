const form = document.querySelector('form');
const resposta = document.getElementById('resposta');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nomeProc = document.getElementById('nomeProc').value;
  const url = '/consultar';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nomeProc })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao buscar usuário.');
    }
    return response.json();
  })
  .then(data => {
    var txtResposta = ''
        txtResposta += `<p>ID do Usuário: ${data.id_db}</p>`
        txtResposta += `<p>Nome do Usuário: ${data.nome_db}</p>`
        txtResposta += `<p>Telefone do Usuário: ${data.telefone_db}</p>`
        txtResposta += `<p>E-mail do Usuário: ${data.email_db}</p>`
        resposta.innerHTML = txtResposta    
  })
  .catch(error => {
    console.error('Erro ao buscar usuário:', error);
    resposta.innerHTML = `<p>Erro ao buscar usuário. Verifique o console para mais detalhes.</p>`;
  });
});


