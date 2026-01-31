const express=require("express");
const router = express.Router();
//Controlador con las acciones de las rutas
const pedidosController = require("../controllers/pedidosController");
//Rutas de videojuegos
router.get("/", pedidosController.get);
router.get("/:id", pedidosController.getById);
router.get("/detalle/:id", pedidosController.getDetailById);
router.get("/vendedor/:id",pedidosController.getByVendedor);
router.get("/vendedor/detalle/:id",pedidosController.getDetailByVendedor);



module.exports = router;
