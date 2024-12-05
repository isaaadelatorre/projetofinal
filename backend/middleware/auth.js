const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['authorization']; // Alterado para 'headers' para maior clareza
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado.' }); // Usando JSON para a resposta
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            return res.status(400).json({ message: 'Token inválido.' }); // Usando JSON para a resposta
        }
        req.user = verified;
        next();
    });
};

module.exports = auth;