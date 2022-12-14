const express = require('express');
const faker = require('faker');
const routersApi = require('./routes');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler');

//se inicia la aplicación
const app = express();

// bodyparser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

app.use(express.json());

//dando acceso a otros origenes diferentes del localhost
const whiteList = ['http://localhost:8080'];
const options = {
    origin: (origin, callback) =>{
        if (whiteList.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    }
}

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());

//enrutamiento
app.get('/', (req, res) => {
    res.send("Hola mi server desde express")
});

routersApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

//inicio del servidor en puerto especificado
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto: http://localhost:" + port);
});