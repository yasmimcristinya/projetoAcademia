CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    cpf VARCHAR(255) UNIQUE NOT NULL,
    recepcionista BOOLEAN DEFAULT FALSE
);
