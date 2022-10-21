const {models} = require('../libs/sequelize').siac;

class AlumnoService {
    constructor() {

    }

    async findOneByCui(cui) {
        let alumno = await models.Alumno.findOne({
            where: { cui },
            include: [
                { 
                    association: 'matriculas', include: [{ association: 'escuela', include: 'facultad'}, 'especialidad']
                },
            ],

        });

        alumno.matriculas.forEach((matricula, x) => {
            let espe = null;
            matricula.especialidad.forEach(especialidad => {
                if (especialidad.numesp === matricula.espe) {
                    espe = especialidad;
                }
            })
            alumno.matriculas[x].setDataValue('especialidad', espe);
        });

        return alumno;
    }

}
 
module.exports =  AlumnoService;