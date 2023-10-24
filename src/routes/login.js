const express = require("express");
const router = express();
require('dotenv').config();

router.use(express.json());

router.post("/", (req, res) => {
    const { registro, senha } = req.body;
    const token = req.headers.authorization;
    token === process.env.TOKEN ? isValidToken = true : isValidToken = false;

    res.header("Access-Control-Allow-Origin", "*");
    if(isValidToken){
        res.status(200).send({ 
            token: "Y9G4q^$@ws8!okusX$&xrn!4usEHt5Uw@qDs5Cc8v$2ze57HCV8@d#MfZ%7%6&6x",
            message: "Login efetuado com sucesso",
            success: true
     });
    }else{
        res.status(401).send({
            message: "Credenciais inválidas",
            success: false
        });
    }
});

module.exports = router;