const express = require("express");
const router = express();
const { fazerConsulta, con } = require("../utils/database/index");
require('dotenv').config();

router.use(express.json());

router.post("/", async (req, res) => {
    try {
        const { registro, senha } = req.body;
        const sql= `SELECT * FROM usuarios where registro = '${registro}' and senha like '%${senha}%'`;
        let resultadoQuery = [];

        con.connect(function(err) {
            console.log("Conectado ao banco de dados!");
            fazerConsulta(sql).then((result) => {
                resultadoQuery = result;
                if(resultadoQuery.length > 0) {
                    res.status(200).send({ 
                        token: "Y9G4q^$@ws8!okusX$&xrn!4usEHt5Uw@qDs5Cc8v$2ze57HCV8@d#MfZ%7%6&6x",
                        message: "Login efetuado com sucesso",
                        success: true,
                        registro: resultadoQuery[0].registro
                    });
                } else {
                    res.status(401).send({
                        message: "Credenciais inválidas",
                        success: false
                    });
                }
            }).catch((error) => {
                console.log(error);
                res.status(401).send({
                    message: "Erro interno do servidor",
                    success: false
                });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Erro interno do servidor",
            success: false
        });
    }
});

module.exports = router;
