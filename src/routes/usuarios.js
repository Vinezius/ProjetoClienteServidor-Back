const express = require('express');
const router = express.Router();
require('dotenv').config();
router.use(express.json());
const { fazerConsulta, con } = require("../utils/database/index");

router.get('/:registro', async (req, res) => {
    try {
        const token = req.headers.authorization;
        token === process.env.TOKEN ? isValidToken = true : isValidToken = false;
        const registro = req.params.registro;
        const sql = `SELECT * FROM usuarios WHERE registro = '${registro}'`;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    res.header("Access-Control-Allow-Origin", "*");
                    return res.status(200).send({ message: 'Usuário encontrado com sucesso', success: true, usuario: result[0] });
                }else{
                    return res.status(403).send({ message: 'Usuário não autorizado', success: false });
                } 
            }).catch((error) => {
                console.log(error);
                return res.status(401).send({ message: 'Usuário não autenticado', success: false });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: 'Erro interno do servidor', success: false });
    }
});

router.put('/:registro', async (req, res) => {
    try {
        const token = req.headers.authorization;
        token === process.env.TOKEN ? isValidToken = true : isValidToken = false;
        const registro = req.params.registro;
        const { nome, email, senha, tipo_usuario } = req.body;
        const sql = `UPDATE usuarios SET nome = '${nome}', email = '${email}', senha = '${senha}', tipo_usuario = '${tipo_usuario}' WHERE registro = '${registro}'`;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    console.log(result);
                    res.header("Access-Control-Allow-Origin", "*");
                    return res.status(200).send({ message: 'Usuário atualizado com sucesso', success: true });
                }else{
                    return res.status(403).send({ message: 'Usuário não autorizado', success: false });
                } 
            }).catch((error) => {
                console.log(error);
                return res.status(401).send({ message: 'Usuário não autenticado', success: false });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: 'Erro interno do servidor', success: false });
    }
});

router.delete('/:registro', async (req, res) => {
    try {
        const token = req.headers.authorization;
        token === process.env.TOKEN ? isValidToken = true : isValidToken = false;
        const registro = req.params.registro;
        const { senha } = req.body;
        const sql = `DELETE FROM usuarios WHERE registro = '${registro}' AND senha = '${senha}'`;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    console.log(result);
                    res.header("Access-Control-Allow-Origin", "*");
                    if(result.affectedRows === 0){
                        return res.status(403).send({ message: 'Usuário não encontrado ou senha incorreta', success: false });
                    }else{
                        return res.status(200).send({ message: 'Usuário deletado com sucesso', success: true });
                    }
                }else{
                    return res.status(403).send({ message: 'Usuário não autorizado', success: false });
                } 
            }).catch((error) => {
                console.log(error);
                return res.status(401).send({ message: 'Usuário não autenticado', success: false });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: 'Erro interno do servidor', success: false });
    }
});

router.get('/', async (req, res) => {
    console.log(req.params);
    try {
        const token = req.headers.authorization;
        token === process.env.TOKEN ? isValidToken = true : isValidToken = false;
        const sql = `SELECT nome, email, registro, senha FROM usuarios`;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    console.log(result);
                    res.header("Access-Control-Allow-Origin", "*");
                    return res.status(200).send({ message: 'Usuários encontrados com sucesso', success: true, usuarios: result });
                }else{
                    return res.status(403).send({ message: 'Usuário não autorizado', success: false });
                } 
            }).catch((error) => {
                console.log(error);
                return res.status(403).send({ message: 'Usuário não autorizado', success: false });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: 'Erro interno do servidor', success: false });
    }
});

router.post('/', async (req, res) => {
    try{
        const token = req.headers.authorization;
        token === process.env.TOKEN ? isValidToken = true : isValidToken = false;
        const { registro, nome, email, senha, tipo_usuario } = req.body;
        const sql = `INSERT INTO usuarios (registro, nome, email, senha, tipo_usuario) 
            VALUES ('${registro}', '${nome}', '${email}', '${senha}', '${tipo_usuario}')`;

            con.connect(function(err) {
                console.log("Conectado ao banco de dados!");
                fazerConsulta(sql).then((result) => {
                    if(isValidToken){
                        try {
                            res.header("Access-Control-Allow-Origin", "*");
                            return res.status(200).send({ message: 'Usuário registrado com sucesso', success: true });
                        } catch (error) {
                            console.error(error);
                            return res.status(401).send({ message: 'Erro ao registrar usuário: Usuário não autenticado', success: false });
                        }
                    }else{
                        return res.status(403).send({ message: 'Erro ao registrar usuário: Usuário não autorizado', success: false });
                    }
                }).catch((error) => {
                    console.log(error);
                    return res.status(401).send({ message: 'Erro interno do servidor', success: false });
                });
            });
    }catch(error){
        console.log(error);
        return res.status(401).send({ message: 'Erro interno do servidor', success: false });
    }
   
   
});

// Export the router
module.exports = router;
