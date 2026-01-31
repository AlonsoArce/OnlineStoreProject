const express=require("express");
const router = express.Router();
//Controlador con las acciones de las rutas
const compraController = require("../controllers/comprasController");
//Rutas de videojuegos
router.get("/", compraController.get);
router.get("/:id", compraController.getById);
router.get("/detalle/:id", compraController.getDetailById);
router.get("/vendedor/:id",compraController.getByVendedor)




module.exports = router;
