const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Função para criar um novo evento
router.post('/', async (req, res) => {
    const { name, date, location, description } = req.body;

    try {
        const newEvent = new Event({ name, date, location, description });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o evento.' });
    }
});

// Função para obter todos os eventos
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter eventos.' });
    }
});

// Função para obter um evento específico
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Evento não encontrado.' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter o evento.' });
    }
});

// Função para atualizar um evento
router.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ error: 'Evento não encontrado.' });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o evento.' });
    }
});

// Função para deletar um evento
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ error: 'Evento não encontrado.' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o evento.' });
    }
});

module.exports = router;