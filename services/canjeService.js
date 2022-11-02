
const {models} = require('../libs/sequelize').siscaja;
const { Sequelize, Op } = require('sequelize');
const moment = require('moment');

class CanjeService {
    constructor () {

    }

    async find(query) {

        let whereCaja = {
            email: query.email
        };

        if(!!query.cuentaCorrienteId)
            whereCaja.cuentaCorrienteId = query.cuentaCorrienteId;

        if(!!query.nroOperacion)
            whereCaja.nroOperacion = query.nroOperacion;

        if(!!query.estado)
            whereCaja.estado = query.estado;

        const data = await models.Canje.findAndCountAll({
            where: whereCaja,
            attributes: ['id', 'estado', 'motivo', 'createdAt', 'fechaPago', 'nroOperacion', 'cuentaCorrienteId', 'urlVoucher', 'comprobanteId'],
            include: ['comprobante',
                { association: 'cuenta', attributes: ['id', 'numero_cuenta', 'banco', 'moneda', 'descripcion'] },
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        
        return data;
    }

    async create(req){
        //const newUser = await models.User.create(data);
        const body = req.body;
        const newCanje = await models.Canje.create({
            codiUsuario: body.codi_usuario,
            nuesEspe: body.nues + body.espe,
            telefonoMovil: body.telefono_movil,
            email: body.email,
            cuentaCorrienteId: body.cuenta_corriente_id,
            fechaPago: body.fecha_pago,
            monto: body.monto,
            nroOperacion: body.nro_operacion,
            urlVoucher: 'my url',
            estado: 'pendiente'
        });

        console.log(body);
        console.log(JSON.parse(body.detalles));

        JSON.parse(body.detalles).forEach(async detalle => {
            await models.DetalleCanje.create({
                canjeId: newCanje.id,
                conceptoId: detalle.concepto_id,
                cantidad: detalle.cantidad,
                precio: detalle.precio
            });
        });

        //return newUser;
        if(!req.files) {
            return {
                status: false,
                message: 'No file uploaded'
            };
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            let extension = '';
            switch (avatar.mimetype) {
                case 'application/pdf':
                    extension = '.pdf';
                    break;
                case 'image/png':
                    extension = '.png';
                    break;
                case 'image/jpeg':
                    extension = '.jpg';
                    break;
            }

            let nombre_archivo = 'voucher' + newCanje.id + extension;

            await newCanje.update({urlVoucher: nombre_archivo});

            let localDate = moment().format('YYYY-MM-DD');
            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            avatar.mv(process.env.STORAGE_PATH + localDate + '/' + nombre_archivo);

            //send response
            return await models.Canje.findByPk(newCanje.id,{
                include: ['detalles']
            });
        }
    }

}

module.exports = CanjeService;