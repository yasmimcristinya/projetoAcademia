const params = new URLSearchParams(window.location.search)

function mascaraCpf(input) {
    let value = input.value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    input.value = value
}

function mascaraTelefone(input) { 
    let value = input.value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
    value = value.replace(/(\d{5})(\d)/, '$1-$2') 
    input.value = value 
}

document.addEventListener('DOMContentLoaded', function() {
    const id = params.get("id")

    const nome = document.getElementById("nome")
    const email = document.getElementById("email")
    const cpf = document.getElementById("cpf")
    const telefone = document.getElementById("telefone")

    const titulo = document.getElementById("tituloPagina")

    if (id) {
        titulo.innerHTML = "Editar aluno:"
        fetch("http://192.168.56.101/api/usuario/" + id)
            .then(response => response.json())
            .then(data => {
                nome.value = data.nome
                email.value = data.email
                cpf.value = data.cpf
                telefone.value = data.telefone
            })
            .catch(error => console.error(error))
    } else {
        titulo.innerHTML = "Adicionar aluno:"
    }
})

document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault()

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const cpf = document.getElementById("cpf").value
    const telefone = document.getElementById("telefone").value

    const dados = {
        nome,
        email,
        cpf,
        telefone
    }
    const id = params.get("id")

    if (id) {
        fetch("http://192.168.56.101/api/usuario/aluno/" + id, {
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
        fetch("http://192.168.56.101/api/usuario/aluno", {
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