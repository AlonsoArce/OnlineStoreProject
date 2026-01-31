const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//metodo para crear metod de pago
module.exports.create = async (request, response, next) => {
    let metodoPago = request.body;
    const nuevoMetodoPago = await prisma.metodoPago.create({
        data:{
            tipo: metodoPago.tipo,
            proveedor: metodoPago.proveedor,
            numeroCuenta: metodoPago.numeroCuenta,
            fechaExpiracion: metodoPago.fechaExpiracion,
            clienteId: metodoPago.clienteId
        }
    });
    response.json(nuevoMetodoPago);
};

