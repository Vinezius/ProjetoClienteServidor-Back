const express = require('express');
const router = express.Router();
require('dotenv').config();
router.use(express.json());
const { fazerConsulta, con } = require("../utils/database/index");

router.post('/', async (req, res) => {
    try{
        const token = req.headers.authorization;
        token === process.env.TOKEN ? isValidToken = true : isValidToken = false;
        const { registro, nome, email, senha, tipo_usuario } = req.body;
        const sql = `INSERT INTO usuarios (registro, nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario) 
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
