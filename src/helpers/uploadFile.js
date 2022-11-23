const multer = require('multer');
const path = require('path');

const uf = {};

var resultado;

uf.loggear = (x) => {
    resultado=x;
}

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/propuestas'),
    filename: (req, file, cb) => {
        console.log(resultado);
        cb(null, resultado+'.pdf');
    }
})

uf.upload =  (fileName) => {
    return multer({
        storage
    }).single(fileName);
}

module.exports = uf;
