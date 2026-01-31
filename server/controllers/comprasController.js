const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const compras = await prisma.compra.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      detallesOrden: true,
    },
  });
  response.json(compras);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const compras = await prisma.compra.findMany({
    where: { clienteId: id },
    select: {
      id: true,
      estado: true,
      total: true,
      detallesOrden: {
        select: { producto: { select: { nombre: true } } },
      },
    },
  });
  response.json(compras);
};

//Detalle
module.exports.getDetailById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const compras = await prisma.compra.findMany({
    where: { clienteId: id },
    select: {
      id: true,
      estado: true,
      impuestos: true,
      total: true,
      detallesOrden: {
        select: { producto: { select: { nombre: true } } },
      },
      evaluacion: true,
    },
  });
  response.json(compras);
};
//Listado para vendedor
module.exports.getByVendedor = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const compras = await prisma.compra.findMany({
    where: {
      detallesOrden: {
        some: {
          producto: {
            vendedorId: id,
          },
        },
      },
    },
    select: {
      id: true,
      estado: true,
      impuestos: true,
      total: true,
      detallesOrden: {
        where: {
          producto: {
            vendedorId: id, //Preguntar como hacer un where anidado
          },
        },
       include:{
        producto:true
        }
      },
    },
  });
  response.json(compras);
};

//Crear
module.exports.create = async (request, response, next) => {
  let infoOrden=request.body;
  const newPedido=await prisma.orden.create({
    data:{
      fechaOrden:infoOrden.fechaOrden,
      usuarioId:1,
      videojuegos:{
        createMany:{
          //[{videojuegoId, cantidad}]
          data: infoOrden.videojuegos
        }
      }
    }   
  })
  response.json(newVideojuego)
};
//Actualizar
module.exports.update = async (request, response, next) => {};
