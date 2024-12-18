const params = new URLSearchParams(window.location.search)

function mascaraMoeda(input) {
    let value = input.value.replace(/\D/g, '')
    value = (value / 100).toFixed(2) + ''; 
    value = value.replace('.', ',');
    value = value.replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
    input.value = value
}

document.addEventListener('DOMContentLoaded', function() {
    const id = params.get("id")

    const nome = document.getElementById("nome")
    const email = document.getElementById("email")
    const cpf = document.getElementById("cpf")
    const telefone = document.getElementById("telefone")

    if (id) {
        fetch("http://192.168.56.101/api/usuario/" + id)
            .then(response => response.json())
            .then(data => {
                nome.innerHTML = data.nome
                email.innerHTML = data.email
                cpf.innerHTML = data.cpf
                telefone.innerHTML = data.telefone
            })
            .catch(error => console.error(error))

        fetch("http://192.168.56.101/api/historico-pagamento/usuario/" + id)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById("tabela-body-pagamento")
                const formatadorParaReal = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: "BRL"
                })
                const situacao = document.getElementById("situacao")
                const formularioPagamento = document.getElementById("formulario-pagamento")
                const dataUltimoPagamento = new Date(data[0].data_pagamento)
                const hoje = new Date()

                if (hoje.getDate() > dataUltimoPagamento.getDate() && hoje.getMonth() > dataUltimoPagamento.getMonth()) {
                    situacao.innerHTML = "ATRASADO"
                    situacao.className = "bg-warning px-2 py-1 rounded fw-bold text-white"
                    formularioPagamento.className = "d-block mt-4"
                } else {
                    situacao.innerHTML  = "EM DIA"
                    situacao.className = "bg-success px-2 py-1 rounded fw-bold text-white"
                    formularioPagamento.className = "d-none"

                }

                data.forEach(pagamento => {
                    const row = document.createElement('tr')
                    row.innerHTML = `
                        <td>${new Date(pagamento.data_pagamento).toLocaleDateString()}</td>
                        <td>${formatadorParaReal.format(pagamento.valor)}</td>
                    `
                    tableBody.appendChild(row)
                });
            })
    }
})


document.getElementById("formulario-pagamento").addEventListener("submit", function(e) {
    e.preventDefault()

    const dataPagamento = document.getElementById("dataPagamento").value
    const valor = document.getElementById("valor").value

    const id = params.get("id")
    const dados = {
        dataPagamento: new Date(dataPagamento).toISOString(),
        valor: Number(valor.replace(',', '.')),
        usuarioId: id
    }

    fetch("http://192.168.56.101/api/usuario/recepcionista/pagamento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensagem) {
            alert(data.mensagem)
        }
        else {
            navegarParaHome()
        }
    })
    .catch(error => alert(error))
})
