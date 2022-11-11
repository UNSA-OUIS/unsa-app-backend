const express = require('express');
const CanjeService = require('../services/canjeService');
const ConceptoService = require('../services/conceptoService');

const router = express.Router();
const serviceCanje = new CanjeService();
const serviceConcepto = new ConceptoService();

router.get('/', async (req, res, next) => {
    try {
        const canjes = await serviceCanje.find(req.query);

        res.json(canjes);
    } catch (error) {
        next(error);
    }
    
});

router.get('/conceptos', async (req, res, next) => {
    try {
        const conceptos = await serviceConcepto.findAllToCanjes();
        const conceptosGlobales = await serviceConcepto.findAllGlobalToCanjes();



        res.json({
            conceptos,
            conceptosGlobales
        });
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