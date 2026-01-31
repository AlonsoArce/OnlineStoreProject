const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//metodo para obtener todas las direcciones del usuario
module.exports.getByUsuario = async (request, response, next) =>{
    let idUsuario = parseInt(request.params.id);
    const direcciones = await prisma.direccion.findMany({
        where:{
            clienteId:idUsuario,
        },
        select:{
            direccion:true,
            provincia: true,
            canton: true,
            distrito: true,
        }
    });
    response.json(direcciones);
}


//metodo para crear direcciones
module.exports.create = async (request, response, next) => {
    let direcciones = request.body;
    const nuevasDirecciones = await prisma.direccion.createMany({
      data: 
        direcciones,
    });
    response.json(nuevasDirecciones);
  };