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
        const conceptos = await service.getConceptos(req.query);

        res.json(conceptos);
    } catch (error) {
        next(error);
    }
    
});

module.exports = router;