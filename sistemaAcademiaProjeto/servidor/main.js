import { BancoDeDados } from "./src/config/bancoDeDados.js";
import { Servidor } from "./src/config/server.js";

async function main() {
    const bancoDeDados = new BancoDeDados("postgres", "pabd", "localhost", "sistemaAcademia", 5432)
    await bancoDeDados.connectar()

    const servidor = new Servidor(bancoDeDados)
    await servidor.iniciar()
}


main()