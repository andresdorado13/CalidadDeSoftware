const express = require('express')
const TaskController= require('../controllers/TaskController');
const PropuestaController = require('../controllers/PropuestaController');
const {upload} = require('../helpers/uploadFile');

const router= express.Router();

router.get('/home', TaskController.home);
router.get('/datos', TaskController.datos);
router.get('/chat', TaskController.chat);
router.get('/registro', TaskController.registro);

router.post('/store-propuesta', [upload('arch')], PropuestaController.store);

router.get('/get-propuestas', PropuestaController.index);
router.get('/create-propuesta',  PropuestaController.create);
router.post('/store-propuesta', [upload('arch')], PropuestaController.store);
router.get('/edit-propuesta/:id', PropuestaController.edit);
router.post('/update-propuesta/:id', [ upload('arch')], PropuestaController.update);
router.get('/delete-propuesta/:id', PropuestaController.delete);


module.exports=router;