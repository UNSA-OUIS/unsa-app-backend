const express = require('express');
const jwt = require('jsonwebtoken');
const UsersService = require('../services/userService');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const siacModels = require('../libs/sequelize').siac.models;

// const TicketService = require('../services/ticketService');


const router = express.Router();

const service = new UsersService();
// const service = new TicketService();

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
        let is_student, is_teacher = false;
        let apn = '';
        let tokenGoogle = req.body.idtoken;
        let googleUser = await verify(tokenGoogle)
                            .catch( err => {
                                console.error(err);
                                return res.status(403).json({
                                    ok: false,
                                    err: err
                                })
                            });

        const userDB = await service.findOneByEmail(googleUser.email);
        if (!userDB) {

            const body = {
                name: googleUser.name,
                email: googleUser.email
            }
            await service.create(body);
            
        }

        let emailGoogle = googleUser.email.split('@')[0];
        const emailUnsa = await siacModels.Actmail.findOne({
            where: { mail: emailGoogle } 
        });

        if (emailUnsa) {
            const alumno = await siacModels.Acdiden.findOne({
                where: { cui: emailUnsa.cui } 
            });
            const docente = await siacModels.Siacdoc.findOne({
                where: { correo: emailGoogle } 
            });
            is_student = alumno ? true : false;
            is_teacher = docente ? true : false;
            apn = alumno ? alumno.apn : docente.apn;
        }

        let user = {
            name: googleUser.name,
            img: googleUser.img,
            pre_email: emailGoogle,
            email: googleUser.email,
            apn,
            is_student,
            is_teacher
        }
        let token = jwt.sign({ user }, 'este-es-el-seed-desarrollo', { expiresIn: 60 * 60 * 24 * 30 });
        res.json({ok: true, user, token});

    } catch (error) {
        next(error);
    }

});

router.post('/p', async (req, res, next) => {
    try {
        let is_student, is_teacher = false;
        let apn = '';
        let emailGoogle = 'atapiar';
        const emailUnsa = await siacModels.Actmail.findOne({
            where: { mail: emailGoogle } 
        });

        if (emailUnsa) {
            const alumno = await siacModels.Acdiden.findOne({
                where: { cui: emailUnsa.cui } 
            });
            const docente = await siacModels.Siacdoc.findOne({
                where: { correo: emailGoogle } 
            });
            is_student = alumno ? true : false;
            is_teacher = docente ? true : false;
            apn = alumno ? alumno.apn : docente.apn;
        }

        let rpta = {
            email: emailGoogle,
            apn,
            is_student,
            is_teacher
        }

        res.json(rpta);
        
    } catch (error) {
        next(error);
    }
});
// router.get('/', async (req, res, next) => {
//     try {
//         const tickets = await service.find(req.query);

//         res.json(tickets);
//     } catch (error) {
//         next(error);
//     }
    
// });

// router.get('/conceptos', async (req, res, next) => {
//     try {
//         const conceptos = await service.getConceptos(req.query);

//         res.json(conceptos);
//     } catch (error) {
//         next(error);
//     }
    
// });

module.exports = router;