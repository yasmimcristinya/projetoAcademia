function navegarParaHome() {
    window.location.href = `index.html`
}

function redirecionarParaDetalhes(id) {
    window.location.href = `detalhe-aluno.html?id=${id}`
}

function navegarParaPagamentosDoUsuario(id) {
    window.location.href = `pagamentos.html?id=${id}`
}


function navegarParaFicha(id) {
    window.location.href = `ficha.html?id=${id}`
}

function navegarParaFormulario(id = null) {
    if (id) {
        window.location.href = `formulario-aluno.html?id=${id}`
    } else {
        window.location.href = `formulario-aluno.html`
    }
}