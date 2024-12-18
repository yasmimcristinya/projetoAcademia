import pg from "pg"

export class BancoDeDados {
    connecao
    
    constructor(usuario, senha, host, nome, porta) {
        this.connecao = new pg.Client({
            user: usuario,
            password: senha,
            host: host,
            database: nome,
            port: porta
        })
    }

    async connectar() {
        try {
            await this.connecao.connect()
            console.log("connectado com sucesso")
        } catch (error) {
            console.error('erro ao conectar com o banco de dados')
            console.log(error)
        }
    }
}