const express = require('express');
const CanjeService = require('../services/canjeService');

const siscajaModels = require('../libs/sequelize').siscaja.models;


const router = express.Router();
const service = new CanjeService();

router.get('/', async (req, res, next) => {
    try {
        const canjes = await service.find(req.query);

        res.json(canjes);
    } catch (error) {
        next(error);
    }
    
});

router.get('/conceptos', async (req, res, next) => {
    try {
        const conceptos = await siscajaModels.ConceptoCaja.findAll({ where: { to_canje: true} });

        res.json(conceptos);
    } catch (error) {
        next(error);
    }
    
});

router.post('/', async (req, res, next) => {
    try {
        const newCanje = await service.create(req);
        res.status(201).json(newCanje);
        
    } catch (err) {
        next(err);
    }
});

router.get('/verify-number', async (req, res, next) => {
    try {
        const number = await service.verifyOperationNumber(req.query);

        res.json(number)
    } catch (error) {
        next(error);
    }
    
});

module.exports = router;