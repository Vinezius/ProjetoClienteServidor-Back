const express = require('express');
const cors = require('cors');
const server = express();
const login = require('./src/routes/login');
const logout = require('./src/routes/logout');
const usuarios = require('./src/routes/usuarios');
const pontos = require('./src/routes/pontos');
const prompt = require('prompt');

prompt.start();

prompt.get(['portaConexao'], function (err, result) {
    if (err) { return onErr(err); }
    const portaConexao = result.portaConexao;

    server.use(cors());
    server.use("/login", login);
    server.use("/logout", logout);
    server.use("/usuarios", usuarios);
    server.use("/usuarios/:registro", usuarios);
    server.use("/pontos", pontos);
    server.use("/pontos/:id", pontos);
    server.listen(portaConexao, () => console.log(`Ouvindo na porta ${portaConexao}`));
});

function onErr(err) {
    console.log(err);
    return 1;
}
