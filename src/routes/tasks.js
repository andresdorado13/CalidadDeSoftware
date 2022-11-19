const express = require('express')
const TaskController= require('../controllers/TaskController');
const router= express.Router();

router.get('/home', TaskController.home);
router.get('/datos', TaskController.datos);
router.get('/chat', TaskController.chat);
router.get('/registro', TaskController.registro);

module.exports=router;