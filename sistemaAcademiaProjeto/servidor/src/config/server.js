import express from 'express'
import cors from 'cors'
import { UsuarioController } from '../controllers/usuarioController.js'
import { FichaTreinoController } from '../controllers/fichaTreinoController.js'
import { HistoricoPagamentoController } from '../controllers/historicoPagamentoController.js'

export class Servidor {
    express
    usuarioController
    
    constructor(bancoDeDados) {
        this.express = express()
        this.usuarioController = new UsuarioController(bancoDeDados)
        this.fichaController = new FichaTreinoController(bancoDeDados)
        this.historicoController = new HistoricoPagamentoController(bancoDeDados)
    }

    async iniciar() {
        this.express.use(cors())
        this.express.use(express.json())
        await this.usuarioController.inicializarRotas()
        await this.fichaController.inicializarRotas()
        await this.historicoController.inicializarRotas()
        this.express.use(this.usuarioController.router)
        this.express.use(this.fichaController.router)
        this.express.use(this.historicoController.router)
        this.express.listen(3000, () => console.log("servidor está rodando"))
    }
}