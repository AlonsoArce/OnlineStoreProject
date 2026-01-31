const dotEnv = require("dotenv"); // gestiona archivos de variables de entorno
const express = require("express"); //gestiona las funciones de express
const { PrismaClient } = require("@prisma/client"); // uso de prisma client como servicio
const { request, response } = require("express"); // fundamentos para dar solicitudes y respuestas de express
const cors = require("cors"); // Configuracion de
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();

//imports Multer
const bodyParser = require("body-parser");
const path = require('path');
const multer = require('multer');
const fs = require('fs');

//Configuracion de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
      // Genera un nombre de archivo único basado en la fecha actual
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  

//---Archivos de rutas--- Todos los archivos de rutas se llaman ahi
const productoRoutes = require('./routes/productoRoutes');
const compraRoutes = require('./routes/compraRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const preguntaRoutes = require('./routes/preguntaRoutes');
const userRoutes = require('./routes/userRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const fotosRoutes = require('./routes/fotosRoutes');
const rolRouter = require("./routes/rolRoutes");
const direccionesRoutes= require("./routes/direccionesRoutes")





// Acceder a la configuracion del archivo .env
dotEnv.config();

// Puerto que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000; //Se puede establecer en el .env un puerto especifico

// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));
// Middleware para gestionar Requests y Response json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(
express.urlencoded({
extended: true,
}));

//Crea una ruta para la carga de imágenes:
// Ruta para manejar la carga de imágenes
app.post('/upload', upload.array('images'), (req, res) => {
    // Aquí puedes realizar acciones adicionales si es necesario
    res.json({ message: 'Imagen cargada con éxito' });
  });

//Agrega una ruta para obtener las imágenes:
// Ruta para obtener las imágenes
app.get('/get-images', (req, res) => {
    const imageFolder = path.join(__dirname, '/uploads');
    console.log(__dirname);
    fs.readdir(imageFolder, (err, files) => {
      if (err) {
        console.error('Error al leer la carpeta de imágenes:', err);
        res.status(500).json({ error: 'Error al obtener las imágenes' });
      } else {
        const imageUrls = files.map(file => '/uploads/' + file);
        res.json(imageUrls);
      }
    });
  });

//---- Definir rutas ----
app.use("/productos/", productoRoutes);
app.use("/compras/", compraRoutes);
app.use("/pedidos/", pedidoRoutes);
app.use("/preguntas/", preguntaRoutes);
app.use("/usuarios/", userRoutes);
app.use("/rol/", rolRouter); 
app.use("/categorias/", categoriaRoutes);
app.use("/fotos/", fotosRoutes);
app.use("/direcciones/",direccionesRoutes)

//Rutas multer 
app.use('/uploads', express.static(path.resolve('uploads')));




// Servidor
app.listen(port, () => {
console.log(`http://localhost:${port}`);
console.log("Presione CTRL-C para deternerlo\n");
});
