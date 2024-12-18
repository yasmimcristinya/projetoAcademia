document.addEventListener('DOMContentLoaded', function(){
    const url = "http://192.168.56.101/api/usuario/aluno"

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("table-body")
            data.forEach(aluno => {
                const row = document.createElement('tr')
                row.innerHTML = `
                    <td>
                        <button onclick="redirecionarParaDetalhes(${aluno.id})" class="btn bg-info text-white rounded-circle p-0 px-1" title="Detalhes"><i class="bi bi-search"></i></button>
                        <button onclick="navegarParaFormulario(${aluno.id})" class="btn bg-warning text-white rounded-circle p-0 px-1" title="Editar"><i class="bi bi-pencil-square"></i></button>
                        <button onclick="navegarParaFicha(${aluno.id})" class="btn bg-primary text-white rounded-circle p-0 px-1" title="Ficha"><i class="bi bi-newspaper"></i></button>
                        <button onclick="navegarParaPagamentosDoUsuario(${aluno.id})" class="btn bg-success text-white rounded-circle p-0 px-1" title="Pagamento"><i class="bi bi-credit-card"></i></button>
                        <button onclick="deletarAluno(${aluno.id})" class="btn bg-danger text-white rounded-circle p-0 px-1" title="Deletar"><i class="bi bi-trash"></i></button>
                    </td>
                    <td>${aluno.id}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.email}</td>
                    <td>${aluno.cpf}</td>
                `
                tableBody.appendChild(row)
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
})

function deletarAluno(id) {
    const foiConfirmado = confirm("Desejar deletar o Aluno? Essa modificação não poderá ser desfeita")
    if (foiConfirmado) {
        fetch(`http://192.168.56.101/api/usuario/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.status === 200) {
                    alert("Usuário deletado com sucesso!")
                    window.location.reload()
                }
            } )
            .catch(err => {
                alert("Não foi possível deletar o usuário")
            })
    }
}