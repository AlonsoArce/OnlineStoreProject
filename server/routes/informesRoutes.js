const express= require("express");
const router = express.Router();

//Controlador con las acciones de las rutas
const informesController = require("../controllers/informesController");

//gets
//rutas get
router.get("/vCantidadCompras", informesController.getCantidadCompras);
router.get("/vTopProductosMes", informesController.getTopProductosMes);
router.get("/vTopVendedores", informesController.getTopVendedores);
router.get("/vTopPeoresVendedores", informesController.getTopPeoresVendedores);
router.get("/vTopProducto", informesController.getTopProducto);
router.get("/vTopCliente", informesController.getTopCliente);


module.exports = router