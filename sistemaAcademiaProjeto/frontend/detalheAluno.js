const params = new URLSearchParams(window.location.search)

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
                nome.value = data.nome
                email.value = data.email
                cpf.value = data.cpf
                telefone.value = data.telefone
            })
            .catch(error => console.error(error))
    }
})