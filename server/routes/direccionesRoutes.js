const express= require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const direccionesController = require("../controllers/direccionesController");

//rutas post
router.post("/", direccionesController.create);
//rutas get
router.get("/:id", direccionesController.getByUsuario);



module.exports = router