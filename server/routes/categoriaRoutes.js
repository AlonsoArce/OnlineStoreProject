const express=require("express");
const router = express.Router();
//Controlador con las acciones de las rutas
const categoriasController = require("../controllers/categoriasController");

//Rutas de categorias
router.get("/", categoriasController.get);

module.exports = router;