const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require("@prisma/client");
const { connect } = require('http2');
const { request } = require('http');
const { response } = require('express');
const { url } = require('inspector');
const prisma = new PrismaClient();

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.originalname}`);
    },
  });

  const upload = multer({
    storage: multerStorage,
    //fileFilter: multerFilter,
  });

    exports.upload = upload.array('images',5)

    exports.uploadFile = (req, res) => {
        console.log(req);
        res.send({data:'Imagenes subidas'})
    }

    exports.getImagenes = (req, res) => {
      const imageFolder = path.join(__dirname, 'server/public');
      console.log(imageFolder);
      fs.readdir(imageFolder, (err, files) => {
        if (err) {
          console.error('Error al leer la carpeta de imágenes:', err);
          res.status(500).json({ error: 'Error al obtener las imágenes' });
        } else {
          const imageUrls = files.map(file => '/public/' + file);
          res.json(imageUrls);
        }
      });
    };

    module.exports.getByProducto = async (request, response, next) => {
      let idProducto = parseInt(request.params.id);
      const fotos = await prisma.foto.findMany({
        where: {
          productoId: idProducto,
        },
        select:{
          url: true,
        }
      });
      response.json(fotos);
    };

    module.exports.create = async (request, response, next) => {
      let foto = request.body;
      console.log(foto);
      const nuevaFoto = await prisma.foto.createMany({
        data: foto
      });
      response.json(nuevaFoto);
    };

    module.exports.delete = async (request, response, next) => {
      let idProducto = parseInt(request.params.id);
      let fotos = await prisma.foto.deleteMany({
        where: {
          productoId: idProducto,
        }
      });
      response.json(fotos)
    }


