const express = require('express');
const router = express.Router();
require('dotenv').config();
router.use(express.json());
const { fazerConsulta, con } = require("../utils/database/index");

router.get('/:id', async (req, res) => {
    try {
        const token = req.headers.authorization;
        token === process.env.TOKEN ? isValidToken = true : isValidToken = false;
        const id = req.params.id;
        const sql = `SELECT * FROM pontos WHERE ponto_id = '${id}'`;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    res.header("Access-Control-Allow-Origin", "*");
                    return res.status(200).send({ message: 'Ponto encontrado com sucesso', success: true, ponto: result[0] });
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

router.put('/:id', async (req, res) => {
    try {
        const token = req.headers.authorization;
        token === process.env.TOKEN ? isValidToken = true : isValidToken = false;
        const id = req.params.id;
        const { nome } = req.body;
        const sql = `UPDATE pontos SET nome = '${nome}' WHERE ponto_id = '${id}'`;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    console.log(result);
                    res.header("Access-Control-Allow-Origin", "*");
                    return res.status(200).send({ message: 'Ponto atualizado com sucesso', success: true });
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

router.delete('/:id', async (req, res) => {
    try {
        const token = req.headers.authorization;
        token === process.env.TOKEN ? isValidToken = true : isValidToken = false;
        const id = req.params.id;
        const { senha } = req.body;
        const sql = `DELETE FROM pontos WHERE ponto_id = '${id}'`;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    console.log(result);
                    res.header("Access-Control-Allow-Origin", "*");
                    if(result.affectedRows === 0){
                        return res.status(403).send({ message: 'Ponto não encontrado', success: false });
                    }else{
                        return res.status(200).send({ message: 'Ponto deletado com sucesso', success: true });
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
        const sql = `SELECT * FROM pontos`;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    console.log(result);
                    res.header("Access-Control-Allow-Origin", "*");
                    return res.status(200).send({ message: 'Pontos encontrados com sucesso', success: true, pontos: result });
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
        const { nome } = req.body;
        const sql = `INSERT INTO pontos ( nome ) VALUES ('${nome}')`;

            con.connect(function(err) {
                console.log("Conectado ao banco de dados!");
                fazerConsulta(sql).then((result) => {
                    if(isValidToken){
                        try {
                            res.header("Access-Control-Allow-Origin", "*");
                            return res.status(200).send({ message: 'Ponto registrado com sucesso', success: true });
                        } catch (error) {
                            console.error(error);
                            return res.status(401).send({ message: 'Erro ao registrar ponto: Usuário não autenticado', success: false });
                        }
                    }else{
                        return res.status(403).send({ message: 'Erro ao registrar ponto: Usuário não autorizado', success: false });
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
