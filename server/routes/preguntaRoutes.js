const express = require('express');
const router = express.Router();

//Controlador
const preguntasController = require('../controllers/preguntasController');
//const auth=require("../middleware/auth")

//Solo puede acceder el administrador
//router.post('/',auth.grantRole(["ADMIN"]),preguntasController.create);

router.post('/',preguntasController.create);
router.get('/vendedor/:id', preguntasController.getByVendedor);
router.put('/:id',preguntasController.update)

module.exports = router;