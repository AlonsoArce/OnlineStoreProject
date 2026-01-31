const express=require("express");
const router = express.Router();
//Controlador con las acciones de las rutas
const fotosController = require("../controllers/fotosController");

router.get('/', fotosController.getImagenes);
router.post('/', fotosController.create);
//router.post('/', fotosController.upload, fotosController.uploadFile);
router.get('/:id', fotosController.getByProducto);
router.delete('/:id', fotosController.delete);

module.exports = router