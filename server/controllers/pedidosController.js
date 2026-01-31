const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const pedidos = await prisma.compra.findMany({
    orderBy: {
      id: "asc",
    },

    include: {
      detallesOrden: {
        include: {
          producto: true,
        },
      },
    },
  });
  response.json(pedidos);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedido = await prisma.compra.findMany({
    where: {
      clienteId: id,
    },
    include: {
      detallesOrden: {
        include: {
          producto: true,
        },
      },
    },
  });
  response.json(pedido);
};

//Detalle
module.exports.getDetailById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedido = await prisma.compra.findUnique({
    where: { id: id },

    include: {
      detallesOrden: {
        include: {
          producto: true,
        },
      },
    },
  });
  response.json(pedido);
};
//Listado para vendedor
module.exports.getByVendedor = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedidos = await prisma.compra.findMany({
    where: {
      detallesOrden: {
        some: {
          producto: {
            vendedorId: id,
          },
        },
      },
    },
    include: {
      cliente: true,
      detallesOrden: {
        where: {
          producto: {
            vendedorId: id,
          },
        },
        include: {
          producto: true,
        },
      },
    },
  });
  response.json(pedidos);
};

//Detalle
module.exports.getDetailByVendedor = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedido = await prisma.compra.findMany({
    where: {
      AND: [
        {
          detallesOrden: {
            some: {
              producto: {
                id: id,
              },
            },
          },
          detallesOrden: {
            some: {
              producto: {
                id: id,
              },
            },
          },
        },
      ],
    },
    include: {
      cliente: true,
      detallesOrden: {
        where: {
          producto: {
            id: id,
          },
        },
        include: {
          producto: true,
        },
      },
    },
  });
  response.json(pedido);
};

//Crear
module.exports.create = async (request, response, next) => {};
//Actualizar
module.exports.update = async (request, response, next) => {};
