const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/', (req, res) => {
    const token = req.headers.authorization;

    token === process.env.TOKEN ? isValidToken = true : isValidToken = false;

    res.header("Access-Control-Allow-Origin", "*");

    if (isValidToken) {
        try{
            res.status(200).send({ message: 'Logout efetuado com sucesso', success: true});
        }catch(error){
            console.log(error);
        }
    } else {
        try{
            res.status(401).send({ message: 'Erro ao efetuar logout', success: false});
        }catch(error){
            console.log(error);
        }
    }
});

module.exports = router;
