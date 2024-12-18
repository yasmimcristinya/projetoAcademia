export class HistoricoPagamento {
    connecaoBancoDeDados

    constructor(connecaoBancoDeDados) {
        this.connecaoBancoDeDados = connecaoBancoDeDados
    }

    async listarHistoricoDePagamentoDoUsuario(id) {
        try {
            const pagamentos = await this.connecaoBancoDeDados.query("SELECT * FROM public.historico_pagamento WHERE usuario_id = $1", [id])
            return pagamentos.rows;
        } catch (error) {
            console.log("erro ao pagar: ", error)
        }
    }

    async criarPagamento(usuarioId, data, valor) {
        try {
            const pagamento = await this.connecaoBancoDeDados.query("INSERT INTO public.historico_pagamento(usuario_id, data_pagamento, valor) VALUES($1, $2, $3)", [usuarioId, data, valor])
            return pagamento.rows;
        } catch (error) {
            console.log("erro ao pagar: ", error)
        }
    }
}