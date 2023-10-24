// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
require('dotenv').config();
router.use(express.json());

// Import the User model
// const User = require('../models/User');

router.post('/', async (req, res) => {
    const token = req.headers.authorization;
    token === process.env.TOKEN ? isValidToken = true : isValidToken = false;

    if(isValidToken){
        try {
            const { registro, nome, email, senha, tipo_usuario } = req.body;
            res.header("Access-Control-Allow-Origin", "*");
    
            // // Check if the user already exists
            // const userExists = await User.findOne({ email });
            // if (userExists) {
            //     return res.status(401).send({ message: 'Usuário já existe', success: false });
            // }
    
            // // Create a new user object
            // const user = new User({
            //     nome,
            //     email,
            //     senha,
            //     tipo_usuario,
            //     registro
            // });
    
            // // Save the user to the database
            // await user.save();
            
            return res.status(200).send({ message: 'Usuário registrado com sucesso', success: true });
        } catch (error) {
            console.error(error);
            return res.status(401).send({ message: 'Erro ao registrar usuário: Usuário não autenticado', success: false });
        }
    }else{
        return res.status(403).send({ message: 'Erro ao registrar usuário: Usuário não autorizado', success: false });
    }
   
});

// Export the router
module.exports = router;
