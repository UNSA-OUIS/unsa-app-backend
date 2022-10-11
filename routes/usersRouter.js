const express = require('express');
const UsersService = require('../services/userService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } =  require('../schemas/userSchema');
const { verifyStudentRole } = require('../middlewares/authentication');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
    try {
        const users = await service.find();

        res.json(users);
    } catch (error) {
        next(error);
    }
    
});

router.get('/:id',
    [validatorHandler(getUserSchema, 'params'), verifyStudentRole],
    async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await service.findOne(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
        
    }
);

router.patch('/:id', 
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const user = await service.update(id, body)
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', 
    validatorHandler(getUserSchema, 'params'),    
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const rpta = await service.delete(id);
            res.json(rpta);
        } catch (error) {
            next(error);
        }
        
    }
);

router.post('/restore/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const rpta = await service.restore(id);
            res.json(rpta);
        } catch (error) {
            next(error);
        }
        
    }
);

module.exports = router;