const express= require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const metodospagoController = require("../controllers/metodospagoController");

//rutas post
router.post("/", metodospagoController.create);
/* rutas get
router.get("/:id", direccionesController.getByUsuario); */

module.exports = router