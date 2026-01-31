const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Listar productos para cualquier usuario:
//Lista que representa de forma diferente (NO es una tabla) y muestra todos
//los productos con información relevante
//para el cliente, máximo 4 campos.
//Debe incluir el enlace para ver el detalle del producto (Preguntar!!!!!!!)
//

module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    orderBy: {
      nombre: "asc",
    },
    select: {
      id:true,
      nombre: true,
      descripcion: true,
      cantidad:true,
      estado: true,
      fotos: { select: { url: true } },
      categoria: { select: { nombre: true } },
    },
  });
  response.json(productos);
};
//Obtener producto por IdVendedor
//Obtener listado
//Listar productos para vendedor:
//Tabla con todos los productos registrados por un vendedor especifico,
//mostrando 4 campos más relevantes como máximo.
//Especifique un vendedor en el código, no debe seleccionarse.
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.producto.findMany({
    where: {
      vendedorId : id ,
    },
    select: {
      id:true,
      nombre: true,
      descripcion: true,
      precio: true,
      cantidad:true,
      estado:true,
      vendedor: { select: { nombreCompleto: true } },
    },
  });
  response.json(producto);
};

//3 Debe mostrar toda la información del producto, incluyendo: 
//nombre de la categoría, lista de fotos, nombre del estado, 
//nombre del proveedor y las preguntas que tenga registradas,
//respectivas para el producto solicitado.//
//
module.exports.getProductDetail = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const productos = await prisma.producto.findUnique({
    where: {
      id : id ,
    },
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      cantidad:true,
      precio:true,
      estado: true,
      categoria: true,
      fotos: true,
      vendedor: true,
      preguntas:{
          select:{
            mensaje:true,respuesta:true,cliente:true
          }
        } 
    },
  });
  response.json(productos);
};

//Obtener listado de Vendedores
module.exports.getListadoVendedores = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({   
    where:{
      roles:{
        some:{
          id:3,
        },
      },      
    },
  });
  response.json(usuarios);
};


//Crear
module.exports.create = async (request, response, next) => {
  let producto = request.body;
  const nuevoProducto = await prisma.producto.create({
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      estado: producto.estado,
      categoriaId: producto.categoriaId,
      vendedorId: producto.vendedorId,
      fotos:{
        createMany:{
          data:
            producto.fotos         
        }
      }        
    },
  });
  response.json(nuevoProducto);
};
//Actualizar
module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idProducto = parseInt(request.params.id);
  console.log(producto);
  //Obtener videojuego viejo
  const productoViejo = await prisma.producto.findUnique({
    where: { id: idProducto },
      include: {
        fotos:
          true
      }
  });

  const nuevoProducto = await prisma.producto.update({
    where: {
      id: idProducto,
    },
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      estado: producto.estado,
      categoriaId: producto.categoriaId,
      vendedorId: producto.vendedorId,
      /* fotos:{
        disconnect: productoViejo.fotos,
        //connect: producto.fotos,
      } */
    },
  });
  response.json(nuevoProducto);
};
