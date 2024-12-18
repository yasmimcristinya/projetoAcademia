export class Usuario {
    connecaoBancoDeDados

    constructor(connecaoBancoDeDados) {
        this.connecaoBancoDeDados = connecaoBancoDeDados
    }

    async buscarPorId(id) {
        try {
            const usuario = await this.connecaoBancoDeDados.query("SELECT * FROM public.usuario WHERE id = $1", [id])
            return usuario.rows[0]
        } catch (error) {
            console.log("erro ao buscar usuario por id")
        }
    }

    async buscaTodosAlunos() {
        try {
            const usuarios = await this.connecaoBancoDeDados.query("SELECT * FROM public.usuario WHERE recepcionista = false")
            return usuarios.rows
        } catch (error) {
            console.log("erro ao buscar todos os usuarios: ", error)
        }
    }

    async buscaTodosRecepcionistas() {
        try {
            const usuarios = await this.connecaoBancoDeDados.query("SELECT * FROM public.usuario WHERE recepcionista = true")
            return usuarios.rows
        } catch (error) {
            console.log("erro ao buscar todos os usuarios: ", error)
        }
    }

    async criar(nome, telefone, email, cpf, recepcionista = false) {
        try {
            const novoUsuario = await this.connecaoBancoDeDados.query("INSERT INTO public.usuario(nome, telefone, email, cpf, recepcionista) VALUES($1, $2, $3, $4, $5)", [nome, telefone, email, cpf, recepcionista])
            return novoUsuario.rows;
        } catch (error) {
            console.log("erro ao criar novo usuario: ", error)
            if (error.detail.includes("email")) {
                throw new Error("Usuário com email já cadastrado")
            } else {
                throw new Error("Usuário com CPF já cadastrado")

            }
        }
    }

    async atualizar(id, nome, telefone, email, cpf, recepcionista = false) {
        try {
            const atualizado = await this.connecaoBancoDeDados.query("UPDATE public.usuario SET nome=$1, telefone=$2, email=$3, cpf=$4, recepcionista=$5 WHERE id = $6 RETURNING *", [nome, telefone, email, cpf, recepcionista, id])
            return atualizado.rows[0]
        } catch (error) {
            console.log("erro ao editar usuario: ", error)
            if (error.detail.includes("email")) {
                throw new Error("Usuário com email já cadastrado")
            } else {
                throw new Error("Usuário com CPF já cadastrado")

            }
        }
    }

    async deletar(id) {
        try {
            const usuario = await this.connecaoBancoDeDados.query("DELETE FROM public.usuario WHERE id = $1", [id])
            return usuario.rowCount > 0
        } catch (error) {
            console.log("erro ao deletar usuario por id: ", error)
        }
    }
}