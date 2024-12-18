CREATE TABLE IF NOT EXISTS historico_pagamento (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    data_pagamento DATE NOT NULL,
    valor FLOAT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
);
