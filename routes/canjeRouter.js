const express = require('express');
const CanjeService = require('../services/canjeService');


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


module.exports = router;