export class FichaTreino {
    connecaoBancoDeDados

    constructor(connecaoBancoDeDados) {
        this.connecaoBancoDeDados = connecaoBancoDeDados
    }

    async buscarPorId(id) {
        try {
            const ficha = await this.connecaoBancoDeDados.query("SELECT * FROM public.ficha_treino WHERE id = $1", [id])
            return ficha.rows[0]
        } catch (error) {
            console.log("erro ao buscar ficha")
        }
    }

    async buscarPorUsuario(id) {
        try {
            const ficha = await this.connecaoBancoDeDados.query("SELECT * FROM public.ficha_treino WHERE usuario_id = $1", [id])
            return ficha.rows[0]
        } catch (error) {
            console.log("erro ao buscar ficha usuario")
        }
    }

    async buscarTodasAsFichas() {
        try {
            const fichas = await this.connecaoBancoDeDados.query("SELECT * FROM public.ficha_treino")
            return fichas.rows
        } catch (error) {
            console.log("erro ao buscar todas as fichas: ", error)
        }
    }

    async criarFicha(usuarioId, exercicios, dataDePagamento, valor) {
        try {
            const novaFicha = await this.connecaoBancoDeDados.query("INSERT INTO public.ficha_treino(usuario_id, exercicios, dia_pagamento, valor_plano) VALUES($1, $2, $3, $4)", [usuarioId, exercicios, dataDePagamento, valor])
            return novaFicha.rows;
        } catch (error) {
            console.log("erro ao criar nova ficha: ", error)
            throw new Error("Usuário já possui uma ficha de treino")
        }
    }

    async atualizarFicha(id, exercicios, dataDePagamento, valor) {
        try {
            const atualizado = await this.connecaoBancoDeDados.query("UPDATE public.ficha_treino SET exercicios=$1, dia_pagamento=$2, valor_plano=$3 WHERE id = $4 RETURNING *", [exercicios, dataDePagamento, valor, id])
            return atualizado.rows[0]
        } catch (error) {
            console.log("erro ao editar ficha: ", error)
        }
    }

    async deletar(id) {
        try {
            const ficha = await this.connecaoBancoDeDados.query("DELETE FROM public.ficha_treino WHERE id = $1", [id])
            return ficha.rowCount > 0
        } catch (error) {
            console.log("erro ao buscar ficha por id")
        }
    }
}