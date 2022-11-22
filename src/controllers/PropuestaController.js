const Propuesta = require('../models/Propuesta');

const PropuestaController = {};

var resultado;

PropuestaController.loggear = (x) => {
    resultado=x;
}

PropuestaController.index = async (req, res) => {
    const propuestas = Propuesta.get();
    console.log(propuestas);
    res.render('layouts/datos', {propuestas});
}

PropuestaController.create = async (req, res) => {
    res.render('layouts/datos');
}

PropuestaController.store = async (req, res) => {
    const data = {
        nombre: req.body.nombre,
        fecha:'27-11-2002',
        votos: 0,
        userid: resultado,
        descripcion: req.body.descripcion
    };
    try {
        await Propuesta.create(data);
        req.toastr.success('La propuesta a sido registrado exitosamente');
        //res.redirect('/datos');
    } catch (e) {
        req.toastr.error('Ha ocurrido un error al registrar la propuesta', '¡ERROR!');
        console.error(e);
    }
    res.redirect('/get-propuestas');
}

PropuestaController.edit = async (req, res) => {
    const plato = await Propuesta.find(req.params.id);
    res.render('layouts/datos', {plato: plato[0]});
}

PropuestaController.update = async (req, res) => {
    let data;
    if (req.file) {
        data = {
            titulo: req.body.titulo,
            arch: req.file.filename,
            descripcion: req.body.descripcion
        };
    } else {
        data = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion
        };
    }

    try {
        await Propuesta.update(req.params.id, data);
        res.redirect('/get-propuestas');
    } catch (e) {
        console.error(e);
    }
}

PropuestaController.delete = async (req, res) => {
    const propuesta = await Propuesta.delete(req.params.id);
    req.toastr.success('Propuesta ha sido eliminada exitosamente', 'Propuesta eliminado');
    res.redirect('/get-propuestas');
}

module.exports = PropuestaController;