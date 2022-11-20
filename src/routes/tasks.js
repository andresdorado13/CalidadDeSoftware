const express = require('express')
const TaskController= require('../controllers/TaskController');
const router= express.Router();

router.get('/home', TaskController.home);
router.get('/datos', TaskController.propuestas);
router.get('/chat', TaskController.chat);
router.get('/registro', TaskController.registro);
router.get('/crearPropuesta', TaskController.crearPropuesta);

module.exports=router;