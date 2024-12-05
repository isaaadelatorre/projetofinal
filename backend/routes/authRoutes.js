const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Certifique-se de que o modelo de usuário está criado

// Função para registrar um usuário
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser  = new User({ username, password: hashedPassword });
        await newUser .save();
        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar o usuário.' });
    }
});

// Função para fazer login de um usuário
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Usuário não encontrado.' });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ error: 'Senha inválida.' });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.header('Authorization', token).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
});

module.exports = router;