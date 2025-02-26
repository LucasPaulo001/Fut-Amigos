function deleteMatch(id){
    const idMatch = id.getAttribute('data-id')
    console.log(idMatch)
    if(confirm("Tem certeza que deseja deletar a partida?")){
        fetch(`/register/deleteMatch/${idMatch}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Erro ao excluir a partida.');
            }
        })
        .catch(error => console.error('Erro:', error));
    }
}   