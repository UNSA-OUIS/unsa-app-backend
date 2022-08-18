const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const name = Joi.string().min(3).max(50);

const createUserSchema = Joi.object({
    email: email.required(),
    name: name.required()
});

const updateUserSchema = Joi.object({
    email: email,
    name: name

});

const getUserSchema = Joi.object({
    id: id.required()

});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };