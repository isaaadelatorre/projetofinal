const mongoose = require('mongoose');

const { Schema } = mongoose; // Desestruturação para maior clareza

const EventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'Participant',
    }],
});

// Exportando o modelo de evento
const Event = mongoose.model('Event', EventSchema);
module.exports = Event;