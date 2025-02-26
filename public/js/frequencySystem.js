function respUp(element) {
    // Encontre o contêiner que engloba os botões (ajuste o seletor conforme sua estrutura)
    const container = element.closest('.btnsFrequency');
    // Se estiver usando classes em vez de IDs, use querySelector('.up') e querySelector('.down')
    const upButton = container.querySelector('#up');
    const downButton = container.querySelector('#down');
    const status = document.querySelectorAll('.status')

    const id = element.getAttribute('data-id');
    const url = `/register/updateStatus/${id}`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ status: 'Vai!' })
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro na requisição');
        return response.json();
    })
    .then(dataJson => {
        console.log(dataJson);
        // Atualiza os botões: up fica verde, down volta ao padrão
        console.log(status)
        // status.forEach((status) => {
            if(dataJson.player && dataJson.player.status === 'Vai!'){
                upButton.style.color = 'green';
                downButton.style.color = '';
            }
        // })
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function respDown(element) {
    const container = element.closest('.btnsFrequency');
    const upButton = container.querySelector('#up');
    const downButton = container.querySelector('#down');
    const status = document.querySelectorAll('.status')

    const id = element.getAttribute('data-id');
    const url = `/register/updateStatus/${id}`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ status: 'Não vai!' })
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Redireciona para a página de onde veio a requisição
        } else {
            return response.json();
        }
    })
    .then(dataJson => {
        console.log(dataJson);
        // Atualiza os botões: down fica vermelho, up volta ao padrão
        console.log(status)
        // status.forEach((status) => {
            if(dataJson.player && dataJson.player.status === 'Não vai!'){
            downButton.style.color = 'red';
            upButton.style.color = '';
        }
        // })
        window.location.href = '/'
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
