const express= require("express");
const router = express.Router();
//Controlador con las acciones de las rutas
const usersController = require("../controllers/usersController");
//Rutas de videojuegos
router.get("/", usersController.get);
router.post("/login", usersController.login);
router.post("/registrar", usersController.register);
router.get("/habilitados", usersController.getByEstadoHabilitado);
router.get("/deshabilitados", usersController.getByEstadoDeshabilitado);
router.get("/:id", usersController.getById);
router.put('/habilitados/:id', usersController.updateEstadoADeshabilitado);
router.put('/deshabilitados/:id', usersController.updateEstadoAHabilitado);



module.exports = router;