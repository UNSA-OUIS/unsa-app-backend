const express = require('express');
const jwt = require('jsonwebtoken');

const UserService = require('../services/userService');
const AlumnoService = require('../services/alumnoService');
const EmailService = require('../services/emailService');
const DocenteService = require('../services/docenteService');

const {OAuth2Client} = require('google-auth-library');
const boom = require('@hapi/boom');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

// Services
const userService = new UserService();
const alumnoService = new AlumnoService();
const emailService = new EmailService();
const docenteService = new DocenteService();

// Configuración de Google
async function verify( token ) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture
    }
}

router.post('/', async (req, res, next) => {
    try {
        let tokenGoogle = req.body.idtoken;
        let is_student, is_teacher = false;
        let apn = '';
        let googleUser = await verify(tokenGoogle)
                            .catch( err => {
                                throw new Error(err);
                            });
        const emailUnsa = await emailService.findOne(googleUser.email);
        if (!emailUnsa) {
            throw boom.notAcceptable('Email no registrado!');
        }

        const alumno = await alumnoService.findOneByCui(emailUnsa.cui);
        const docente = await docenteService.findOneByEmail(emailUnsa.mail);
        is_student = alumno ? true : false;
        is_teacher = docente ? true : false;
        apn = alumno ? alumno.apn : docente.apn;
        apn = apn.replace('/', ' ');

        const userDB = await userService.findOneByEmail(googleUser.email);
        if (!userDB) {
            const body = {
                name: googleUser.name,
                email: googleUser.email
            }
            await service.create(body);
        }    

        let user_token = {
            name: googleUser.name,
            img: googleUser.img,
            user_email: emailUnsa.mail,
            email: googleUser.email,
            apn,
            is_student,
            is_teacher
        }
        let token = jwt.sign({ user_token }, process.env.TOKEN_SEED, { expiresIn: 60 * 60 * 24 * 30 });
        res.json({
            apn,
            user_email: emailUnsa.mail,
            email: googleUser.email,
            is_student,
            is_teacher,
            alumno,
            docente,
            token
        });

    } catch (error) {
        next(error);
    }

});

module.exports = router;