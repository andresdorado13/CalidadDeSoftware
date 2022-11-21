const multer = require('multer');
const path = require('path');

const uf = {};

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/propuestas'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

uf.upload = (fileName) => {
    return multer({
        storage
    }).single(fileName);
}

module.exports = uf;