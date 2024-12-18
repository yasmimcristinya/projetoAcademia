import { Router } from "express"
import { Usuario } from "../models/usuario.js"
import { FichaTreino } from "../models/fichaTreino.js"
import { HistoricoPagamento } from "../models/historicoPagamento.js"

export class UsuarioController {
    router

    constructor(bancoDeDados) {
        this.bancoDeDados = bancoDeDados
        this.router = Router()
    }

    async inicializarRotas() {
        this.buscarTodosAlunos()
        this.buscarTodosRecepcionistas()
        this.buscaPorId()
        this.criarAluno()
        this.atualizarAluno()
        this.deletarUsuario()
        this.buscaFichaDoAluno()
        this.adicionarFichaAoAluno()
        this.atualizarFichaDoAluno()
        this.criarRecepcionista()
        this.atualizarRecepcionista()
        this.pagamento()
    }

    async buscarTodosAlunos() {
        this.router.get('/usuario/aluno', async (req, res) => {
            const model = new Usuario(this.bancoDeDados.connecao)
            const usuarios = await model.buscaTodosAlunos()
            res.status(200).json(usuarios)
        })
    }

    async buscarTodosRecepcionistas() {
        this.router.get('/usuario/recepcionista', async (req, res) => {
            const model = new Usuario(this.bancoDeDados.connecao)
            const usuarios = await model.buscaTodosRecepcionistas()
            res.status(200).json(usuarios)
        })
    }

    async buscaPorId() {
        this.router.get('/usuario/:id', async (req, res) => {
            const { id } = req.params
            const model = new Usuario(this.bancoDeDados.connecao)
            const usuario = await model.buscarPorId(id)
            if (usuario == null) {
                res.status(404).json({mensagem: "Usuario não encontrado"})
            } else {
                res.json(usuario).status(201)
            }
        })
    }
    
    async criarAluno() {
        this.router.post('/usuario/aluno', async (req, res) => {
            const {nome, telefone, email, cpf} = req.body
            const model = new Usuario(this.bancoDeDados.connecao)
            try {
                const novoUsuario = await model.criar(nome, telefone, email, cpf)
                res.status(201).json(novoUsuario)
            } catch (error) {
                res.status(400).json({mensagem: error.message})
            }
        })
    }

    async criarRecepcionista() {
        this.router.post('/usuario/recepcionista', async (req, res) => {
            const {nome, telefone, email, cpf} = req.body
            const model = new Usuario(this.bancoDeDados.connecao)
            try {
                const novoUsuario = await model.criar(nome, telefone, email, cpf, true)
                res.status(201).json(novoUsuario)
            } catch (error) {
                res.status(400).json({mensagem: error.message})
            }
        })
    }

    async atualizarAluno() {
        this.router.put('/usuario/aluno/:id', async (req, res) => {
            const { id } = req.params
            const {nome, telefone, email, cpf} = req.body
            const model = new Usuario(this.bancoDeDados.connecao)
            try {
                const usuarioAtualizado = await model.atualizar(id, nome, telefone, email, cpf)
                if (usuarioAtualizado == null) {
                    res.status(404).json({mensagem: "Usuario não encontrado"})
                } else {
                    res.status(200).json(usuarioAtualizado)
                }
            } catch (error) {
                res.status(400).json({mensagem: error.message})
            }
        })
    }

    async atualizarRecepcionista() {
        this.router.put('/usuario/recepcionista/:id', async (req, res) => {
            const { id } = req.params
            const {nome, telefone, email, cpf} = req.body
            const model = new Usuario(this.bancoDeDados.connecao)
            try {
                const usuarioAtualizado = await model.atualizar(id, nome, telefone, email, cpf, true)
                if (usuarioAtualizado == null) {
                    res.status(404).json({mensagem: "Usuario não encontrado"})
                } else {
                    res.status(200).json(usuarioAtualizado)
                }
            } catch (error) {
                res.status(400).json({mensagem: error.message})
            }
        })
    }

    async buscaFichaDoAluno() {
        this.router.get('/usuario/aluno/:id/ficha', async (req, res) => {
            const { id } = req.params
            const usuarioModel = new Usuario(this.bancoDeDados.connecao)
            const usuario = await usuarioModel.buscarPorId(id)
            if (usuario == null) {
                res.status(404).json({mensagem: "Usuario não encontrado"})
                return
            } else {
                const model = new FichaTreino(this.bancoDeDados.connecao)
                const ficha = await model.buscarPorUsuario(id)
                res.json(ficha).status(200)
            }

        })
    }

    async adicionarFichaAoAluno() {
        this.router.post('/usuario/recepcionista/ficha', async (req, res) => {
            const {exercicios, diaPagamento, usuarioId, valor} = req.body
            const usuarioModel = new Usuario(this.bancoDeDados.connecao)
            const usuario = await usuarioModel.buscarPorId(usuarioId)
            if (usuario == null) {
                res.status(404).json({mensagem: "Usuário não encontrado"})
                return
            }
            try {
                const model = new FichaTreino(this.bancoDeDados.connecao)
                const ficha = await model.criarFicha(usuarioId, exercicios, diaPagamento, valor)
                const historico = new HistoricoPagamento(this.bancoDeDados.connecao)
                await historico.criarPagamento(usuarioId, new Date().toISOString(), valor)
                res.status(200).json(ficha)
            } catch (error) {
                res.status(400).json({mensagem: error.message})
            }
        })
    }

    async atualizarFichaDoAluno() {
        this.router.put('/usuario/recepcionista/ficha/:fichaId', async (req, res) => {
            const { fichaId } = req.params
            const {exercicios, diaPagamento, valor} = req.body
            try {

                const model = new FichaTreino(this.bancoDeDados.connecao)
                const ficha = await model.atualizarFicha(fichaId, exercicios, diaPagamento, valor)

                res.status(200).json(ficha)
            } catch (error) {
                res.status(400).json({mensagem: error.message})
            }
        })
    }

    async pagamento() {
        this.router.post('/usuario/recepcionista/pagamento', async (req, res) => {
            const { usuarioId, valor, dataPagamento } = req.body
            try {
                const model = new HistoricoPagamento(this.bancoDeDados.connecao)
                const pagamento = await model.criarPagamento(usuarioId, dataPagamento, valor)
                res.status(200).json(pagamento)
            } catch (error) {
                res.status(400).json({mensagem: error.message})
            }
        })
    }

    async deletarUsuario() {
        this.router.delete('/usuario/:id', async (req, res) => {
            const { id } = req.params
            const model = new Usuario(this.bancoDeDados.connecao)
            const deletado = await model.deletar(id)
            if (deletado) {
                res.sendStatus(200)
            } else {
                res.status(404).json({mensagem: "Usuario não encontrado"})
            }
        })
    }
}