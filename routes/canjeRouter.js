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

module.exports = router;