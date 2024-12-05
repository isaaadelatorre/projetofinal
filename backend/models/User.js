const mongoose = require('mongoose');

const { Schema } = mongoose; // Desestruturação para maior clareza

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Exportando o modelo de usuário
const User = mongoose.model('User ', UserSchema);
module.exports = User;