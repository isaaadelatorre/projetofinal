const mongoose = require('mongoose');

const { Schema } = mongoose; // Desestruturação para maior clareza

const ParticipantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Adicionando a restrição de unicidade para o email
        match: /.+\@.+\..+/ // Adicionando uma validação básica de formato de email
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
    }],
});

// Exportando o modelo de participante
const Participant = mongoose.model('Participant', ParticipantSchema);
module.exports = Participant;