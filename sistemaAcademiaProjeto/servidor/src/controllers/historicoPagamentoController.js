import { Router } from "express"
import { HistoricoPagamento } from "../models/historicoPagamento.js"

export class HistoricoPagamentoController {
    router

    constructor(bancoDeDados) {
        this.bancoDeDados = bancoDeDados
        this.router = Router()
    }

    async inicializarRotas() {
        this.buscarHistoricoDoUsuario()
    }

    async buscarHistoricoDoUsuario() {
        this.router.get('/historico-pagamento/usuario/:id', async (req, res) => {
            const { id } = req.params
            const model = new HistoricoPagamento(this.bancoDeDados.connecao)
            const pagamentos = await model.listarHistoricoDePagamentoDoUsuario(id)
            res.json(pagamentos).status(200)
        }) 
    }
}