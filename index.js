const express = require('express');
const cors = require('cors');
const server = express();
const login = require('./src/routes/login');
const logout = require('./src/routes/logout');
const usuarios = require('./src/routes/usuarios');

const corsOptions = {
    origin: 'http://localhost:3000', // Defina sua origem permitida aqui
    credentials: true, // Permitir credenciais
  };

server.use(cors(corsOptions));
server.use("/login", login);
server.use("/logout", logout);
server.use("/usuarios", usuarios);
server.use("/usuarios/:registro", usuarios);
server.options(cors(corsOptions));
server.listen(3333, () => console.log('Ouvindo na porta 3333'));