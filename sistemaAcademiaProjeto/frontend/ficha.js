const params = new URLSearchParams(window.location.search)
let fichaId = null;

function mascaraMoeda(input) {
    let value = input.value.replace(/\D/g, '')
    value = (value / 100).toFixed(2) + ''; 
    value = value.replace('.', ',');
    value = value.replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
    input.value = value
}

document.addEventListener('DOMContentLoaded', function() {
    const id = params.get("id")

    const exercicios = document.getElementById("exercicios")
    const diaPagamento = document.getElementById("diaPagamento")
    const valor = document.getElementById("valor")

    const titulo = document.getElementById("tituloPagina")

    if (id) {
        fetch("http://192.168.56.101/api/usuario/aluno/" + id + "/ficha")
        .then(response => response.json())
        .then(data => {
                if (data) {
                    titulo.innerHTML = "Editar ficha:"
                    fichaId = data.id
                    exercicios.value = data.exercicios
                    diaPagamento.value = data.dia_pagamento
                    valor.value = String(data.valor_plano).replace('.',',')
                } 
            })
            .catch(error => console.error(error))
    }
})

document.getElementById("formularioFicha").addEventListener("submit", function(e) {
    e.preventDefault()

    const exercicios = document.getElementById("exercicios").value
    const diaPagamento = document.getElementById("diaPagamento").value
    const valor = document.getElementById("valor").value

    const id = params.get("id")
    const dados = {
        exercicios,
        diaPagamento: Number(diaPagamento),
        valor: Number(valor.replace(',', '.')),
        usuarioId: id
    }

    if (fichaId) {
        fetch("http://192.168.56.101/api/usuario/recepcionista/ficha/" + fichaId, {
            method: "PUT",
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
    } else {
        fetch("http://192.168.56.101/api/usuario/recepcionista/ficha", {
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
    }
})
