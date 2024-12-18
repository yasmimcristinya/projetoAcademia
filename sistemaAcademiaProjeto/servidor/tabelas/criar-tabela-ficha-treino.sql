CREATE TABLE IF NOT EXISTS ficha_treino (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL UNIQUE,
    exercicios TEXT,
    valor_plano FLOAT NOT NULL,
    dia_pagamento INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
);
