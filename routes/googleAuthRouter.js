const express = require('express');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

// const TicketService = require('../services/ticketService');


const router = express.Router();
// const service = new TicketService();

// Configuración de Google
async function verify( token ) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
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

router.post('/', async (req, res) => {

    let tokenGoogle = req.body.idtoken;
    let googleUser = await verify(tokenGoogle)
                        .catch( e => {
                            return res.status(403).json({
                                ok: false,
                                err: e
                            })
                        })
    let token = jwt.sign({ user: googleUser }, 'este-es-el-seed-desarrollo', { expiresIn: 60 * 60 * 24 * 30 });
    res.json({
        user: googleUser,
        token
    });
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