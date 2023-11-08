const express = require('express');
const cors = require('cors');
const server = express();
const login = require('./src/routes/login');
const logout = require('./src/routes/logout');
const usuarios = require('./src/routes/usuarios');

server.use(cors());
server.use("/login", login);
server.use("/logout", logout);
server.use("/usuarios", usuarios);
server.use("/usuarios/:registro", usuarios);
server.listen(21000, () => console.log('Ouvindo na porta 21000'));