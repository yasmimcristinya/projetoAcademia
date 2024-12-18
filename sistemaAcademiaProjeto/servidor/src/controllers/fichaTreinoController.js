import { Router } from "express"
import { FichaTreino } from "../models/fichaTreino.js"

export class FichaTreinoController {
    router

    constructor(bancoDeDados) {
        this.bancoDeDados = bancoDeDados
        this.router = Router()
    }

    async inicializarRotas() {
        this.buscarFichaPorId()
        this.buscarTodasAsFichas()
    }

    async buscarTodasAsFichas() {
        this.router.get('/ficha-treino', async (req, res) => {
            const model = new FichaTreino(this.bancoDeDados.connecao)
            const fichas = await model.buscarTodasAsFichas()
            res.status(200).json(fichas)
        })
    }

    async buscarFichaPorId() {
        this.router.get('/ficha-treino/:id', async (req, res) => {
            const { id } = req.params
            const model = new FichaTreino(this.bancoDeDados.connecao)
            const ficha = await model.buscarPorId(id)
            res.status(200).json(ficha)
        })
    }
}