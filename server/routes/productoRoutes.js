const express=require("express");
const router = express.Router();
//Controlador con las acciones de las rutas
const productoController = require("../controllers/productosController");
//Rutas de productos
router.get("/", productoController.get);
router.get("/vendedores", productoController.getListadoVendedores);
router.post("/", productoController.create);
router.get("/vendedores/:id", productoController.getById);
router.get("/detalle/:id", productoController.getProductDetail);
router.put("/:id", productoController.update);


module.exports = router;
