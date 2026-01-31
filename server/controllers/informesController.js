const { PrismaClient,Prisma } = require("@prisma/client");
const prisma = new PrismaClient();


//En el dashboard del administrador se presenta la Cantidad 
//de compras registradas en el día.
module.exports.getCantidadCompras = async (request, response, next) => {
    //let mes = parseInt(request.params.mes ); 
    const result= await prisma.$queryRawUnsafe(
      `SELECT count(*) as cuenta_compras FROM proyecto_bd.compra c WHERE c.fechaCompra like '%2023-08-24%'`
    )
    //SELECT *, count(*) as cuenta_compras FROM proyecto_bd.compra c WHERE c.fechaCompra like '%2023-08-24%';
    const customJson = JSON.stringify(result , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });
    const outputObject = JSON.parse(customJson);
    response.json(outputObject);
  };

  //En el dashboard del administrador se presenta el Top 5 productos más comprado en el mes.
  module.exports.getTopProductosMes = async (request, response, next) => {
    //let mes = parseInt(request.params.mes ); 
    const result= await prisma.$queryRawUnsafe(
      `SELECT p.id, p.nombre, COUNT(*) AS cantidad_compras
      FROM proyecto_bd.producto p
      JOIN proyecto_bd.detallecompra dc ON p.id = dc.productoId
      JOIN proyecto_bd.compra c ON dc.compraId = c.id
      WHERE YEAR(c.fechaCompra) = 2023 AND MONTH(c.fechaCompra) = 8
      GROUP BY p.id, p.nombre
      ORDER BY cantidad_compras DESC
      LIMIT 5`
    )
    /* SELECT p.id AS id_producto, p.nombre AS nombre_producto, COUNT(*) AS cantidad_compras
    FROM proyecto_bd.producto p
    JOIN proyecto_bd.detallecompra dc ON p.id = dc.productoId
    JOIN proyecto_bd.compra c ON dc.compraId = c.id
    WHERE YEAR(c.fechaCompra) = 2023 AND MONTH(c.fechaCompra) = 8
    GROUP BY p.id, p.nombre
    ORDER BY cantidad_compras DESC
    LIMIT 5; */
    const customJson = JSON.stringify(result , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });
    const outputObject = JSON.parse(customJson);
    response.json(outputObject);
  };


  //En el dashboard del administrador se presenta el Top 5 vendedores con mejor evaluación
  module.exports.getTopVendedores = async (request, response, next) => {
    //let mes = parseInt(request.params.mes ); 
    const result= await prisma.$queryRawUnsafe(
      `SELECT u.id AS id_vendedor, u.nombreCompleto AS nombre_vendedor, AVG(e.calificacion) AS puntuacion_promedio
      FROM proyecto_bd.usuario u
      JOIN proyecto_bd.evaluacion e ON u.id = e.evaluadoId
      GROUP BY u.id, u.nombreCompleto
      ORDER BY puntuacion_promedio DESC
      LIMIT 5`
    )
    /* SELECT u.id AS id_vendedor, u.nombreCompleto AS nombre_vendedor, AVG(e.calificacion) AS puntuacion_promedio
        FROM proyecto_bd.usuario u
        JOIN proyecto_bd.evaluacion e ON u.id = e.evaluadoId
        GROUP BY u.id, u.nombreCompleto
        ORDER BY puntuacion_promedio DESC
        LIMIT 5 */
    const customJson = JSON.stringify(result , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });
    const outputObject = JSON.parse(customJson);
    response.json(outputObject);
  };

  //En el dashboard del administrador se presenta el Top 3 peores vendedores evaluados.
  module.exports.getTopPeoresVendedores = async (request, response, next) => {
    //let mes = parseInt(request.params.mes ); 
    const result= await prisma.$queryRawUnsafe(
      `SELECT u.id AS id_vendedor, u.nombreCompleto AS nombre_vendedor, AVG(e.calificacion) AS puntuacion_promedio
      FROM proyecto_bd.usuario u
      JOIN proyecto_bd.evaluacion e ON u.id = e.evaluadoId
      GROUP BY u.id, u.nombreCompleto
      ORDER BY puntuacion_promedio ASC
      LIMIT 3`
    )
    /* SELECT u.id AS id_vendedor, u.nombreCompleto AS nombre_vendedor, AVG(e.calificacion) AS puntuacion_promedio
FROM proyecto_bd.usuario u
JOIN proyecto_bd.evaluacion e ON u.id = e.evaluadoId
GROUP BY u.id, u.nombreCompleto
ORDER BY puntuacion_promedio ASC
LIMIT 3;*/
    const customJson = JSON.stringify(result , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });
    const outputObject = JSON.parse(customJson);
    response.json(outputObject);
  };

  //En el dashboard del vendedor se presenta el Producto más vendido del vendedor
  module.exports.getTopProducto = async (request, response, next) => {
    //let mes = parseInt(request.params.mes ); 
    const result= await prisma.$queryRawUnsafe(
      `SELECT p.id AS id_producto, p.nombre AS nombre_producto, COUNT(*) AS cantidad_vendida
      FROM proyecto_bd.producto p
      JOIN proyecto_bd.detallecompra dc ON p.id = dc.productoId
      JOIN proyecto_bd.compra c ON dc.compraId = c.id
      JOIN proyecto_bd.usuario u ON p.vendedorId = u.id
      WHERE u.id = 6
      GROUP BY p.id, p.nombre
      ORDER BY cantidad_vendida DESC
      LIMIT 1;`
    )
    /* SELECT p.id AS id_producto, p.nombre AS nombre_producto, COUNT(*) AS cantidad_vendida
FROM proyecto_bd.producto p
JOIN proyecto_bd.detallecompra dc ON p.id = dc.productoId
JOIN proyecto_bd.compra c ON dc.compraId = c.id
JOIN proyecto_bd.usuario u ON p.vendedorId = u.id
WHERE u.id = 6
GROUP BY p.id, p.nombre
ORDER BY cantidad_vendida DESC
LIMIT 1;*/
    const customJson = JSON.stringify(result , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });
    const outputObject = JSON.parse(customJson);
    response.json(outputObject);
  };

  //En el dashboard del vendedor se presenta el Cliente que ha realizado más compras, sumando las cantidades 
  //de todos los productos correspondientes al vendedor
  module.exports.getTopCliente = async (request, response, next) => {
    //let mes = parseInt(request.params.mes ); 
    const result= await prisma.$queryRawUnsafe(
      `SELECT c.id AS id_cliente, c.nombreCompleto AS nombre_cliente, SUM(dc.cantidad) AS total_comprado
      FROM proyecto_bd.usuario c
      JOIN proyecto_bd.compra co ON c.id = co.clienteId
      JOIN proyecto_bd.detallecompra dc ON co.id = dc.compraId
      JOIN proyecto_bd.producto p ON dc.productoId = p.id
      JOIN proyecto_bd.usuario v ON p.vendedorId = v.id
      WHERE v.id = 5
      GROUP BY c.id, c.nombreCompleto
      ORDER BY total_comprado DESC
      LIMIT 1;`
    )
    /* SELECT c.id AS id_cliente, c.nombreCompleto AS nombre_cliente, SUM(dc.cantidad) AS total_comprado
FROM proyecto_bd.usuario c
JOIN proyecto_bd.compra co ON c.id = co.clienteId
JOIN proyecto_bd.detallecompra dc ON co.id = dc.compraId
JOIN proyecto_bd.producto p ON dc.productoId = p.id
JOIN proyecto_bd.usuario v ON p.vendedorId = v.id
WHERE v.id = 5
GROUP BY c.id, c.nombreCompleto
ORDER BY total_comprado DESC
LIMIT 1*/
    const customJson = JSON.stringify(result , (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
    });
    const outputObject = JSON.parse(customJson);
    response.json(outputObject);
  };


