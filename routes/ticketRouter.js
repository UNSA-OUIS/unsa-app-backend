const express = require('express');
const TicketService = require('../services/ticketService');


const router = express.Router();
const service = new TicketService();

router.get('/', async (req, res, next) => {
    try {
        const tickets = await service.find(req.query);

        res.json(tickets);
    } catch (error) {
        next(error);
    }
    
});

router.get('/conceptos', async (req, res, next) => {
    try {
        const conceptos = await service.getConcepts(req.query);

        res.json(conceptos);
    } catch (error) {
        next(error);
    }
    
});

router.post('/generate-code',
    async (req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.generadeCode(body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
        
    }
);

module.exports = router;