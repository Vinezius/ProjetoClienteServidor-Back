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
        const sql = `
        SELECT 
            segmento.segmento_id,
            segmento.status,
            segmento.distancia,
            segmento.direcao,
            ponto_inicial.nome AS ponto_inicial,
            ponto_final.nome AS ponto_final
        FROM segmentos AS segmento
        INNER JOIN pontos AS ponto_inicial ON segmento.ponto_inicial = ponto_inicial.ponto_id
        INNER JOIN pontos AS ponto_final ON segmento.ponto_final = ponto_final.ponto_id
        WHERE segmento_id = '${id}';
        `;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    res.header("Access-Control-Allow-Origin", "*");
                    return res.status(200).send({ message: 'Segmento encontrado com sucesso', success: true, segmento: result[0] });
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
        const { distancia, ponto_inicial, ponto_final, status, direcao } = req.body;
        const sql = `UPDATE segmentos SET distancia = '${distancia}', ponto_inicial = '${ponto_inicial}', ponto_final = '${ponto_final}', 
                        status = '${status}', direcao = '${direcao}' WHERE segmento_id = '${id}'`;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    console.log(result);
                    res.header("Access-Control-Allow-Origin", "*");
                    return res.status(200).send({ message: 'Segmento atualizado com sucesso', success: true });
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
        const sql = `DELETE FROM segmentos WHERE segmento_id = '${id}'`;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    console.log(result);
                    res.header("Access-Control-Allow-Origin", "*");
                    if(result.affectedRows === 0){
                        return res.status(403).send({ message: 'Segmento não encontrado', success: false });
                    }else{
                        return res.status(200).send({ message: 'Segmento deletado com sucesso', success: true });
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
        const sql = `
                    SELECT 
                        segmento.segmento_id,
                        segmento.status,
                        segmento.distancia,
                        segmento.direcao,
                        ponto_inicial.nome AS ponto_inicial,
                        ponto_final.nome AS ponto_final
                    FROM segmentos AS segmento
                    INNER JOIN pontos AS ponto_inicial ON segmento.ponto_inicial = ponto_inicial.ponto_id
                    INNER JOIN pontos AS ponto_final ON segmento.ponto_final = ponto_final.ponto_id;
                    `;
        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                if(isValidToken){
                    console.log(result);
                    res.header("Access-Control-Allow-Origin", "*");
                    return res.status(200).send({ message: 'Segmentos encontrados com sucesso', success: true, segmentos: result });
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
        const { distancia, ponto_inicial, ponto_final, status, direcao } = req.body;
        const sql = `INSERT INTO segmentos (distancia, ponto_inicial, ponto_final, status, direcao) 
                    VALUES ('${distancia}', '${ponto_inicial}', '${ponto_final}', '${status}', '${direcao}')`;
            con.connect(function(err) {
                console.log("Conectado ao banco de dados!");
                fazerConsulta(sql).then((result) => {
                    if(isValidToken){
                        try {
                            res.header("Access-Control-Allow-Origin", "*");
                            return res.status(200).send({ message: 'Segmento registrado com sucesso', success: true });
                        } catch (error) {
                            console.error(error);
                            return res.status(401).send({ message: 'Erro ao registrar segmento: Usuário não autenticado', success: false });
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
