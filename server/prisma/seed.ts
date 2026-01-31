import { PrismaClient } from '@prisma/client';
import { categorias } from './seeds/categorias';
import { roles } from './seeds/roles';

const prisma = new PrismaClient();

async function main() {
    //inserts de la tabla roles
    await prisma.rol.createMany({
        data: roles
    });
    //inserts de la tabla categorias
    await prisma.categoria.createMany({
        data: categorias
    });
     //inserts de la tabla usuarios

    //usuario administrador 1 ID:1
    await prisma.usuario.create({
        data: {
            nombreCompleto: 'Cristian',
            identificacion: '123121211',
            numeroTelefono: '8521-3563',
            correoElectronico: 'cristian@closetbypaula.com',
            contrasena: '$2b$10$nNws9Dy6Zjl/.ka5G7KmF.5CkKA8ta6H8TR0QTKUK1TNyhlw372zi',
            estado: 'HABILITADO',
            roles: {
                connect: [{ id: 1 }] //va a ser solo administrador
            }
        }
    });
    //usuario administrador 2 ID:2
    await prisma.usuario.create({
        data: {
            nombreCompleto: 'Alonso Arce Mora',
            identificacion: '111112333',
            numeroTelefono: '8692-8839',
            correoElectronico: 'alonso@closetbypaula.com',
            contrasena: '$2b$10$f3Z/7j46VjS5koPRWoWSu.Z6pAmP4AYO3j0xkDrjWnEJVnXUspL.u',
            estado: 'DESHABILITADO',
            roles: {
                connect: [{ id: 1 }] //va a ser solo administrador
            }
        }
    });
    //usuario cliente 1 ID:3
    await prisma.usuario.create({
        data: {
            nombreCompleto: 'Jose Perez Rodriguez',
            identificacion: '122323323',
            numeroTelefono: '8777-6666',
            correoElectronico: 'jose@closetbypaula.com',
            contrasena: '$2b$10$C7Sxdwr.aQAOpnlAgff1/e9BcetKDBDze694/ZHpyj.QVTZIvoRcS',
            estado: 'HABILITADO',
            roles: {
                connect: [{ id: 2 }] //va a ser solo cliente
            }
        }
    });
    //usuario cliente 2 ID:4
    await prisma.usuario.create({
        data: {
            nombreCompleto: 'Dominga Juarez Bermudez',
            identificacion: '234534334',
            numeroTelefono: '8775-6663',
            correoElectronico: 'dominga@closetbypaula.com',
            contrasena: '$2b$10$5qmm45S/nTFxR1aSZerSH.RrirbtQM0cB0fVtGMGg5r2VpB6Hop42',
            estado: 'DESHABILITADO',
            roles: {
                connect: [{ id: 2 }] //va a ser solo cliente
            }
        }
    });
    //usuario vendedor 1 ID:5
    await prisma.usuario.create({
        data: {
            nombreCompleto: 'Julia Mora Bermudez',
            identificacion: '234534434',
            numeroTelefono: '8778-6663',
            correoElectronico: 'julia@closetbypaula.com',
            contrasena: '$2b$10$e99.ADNtX.GujZU9XmDRqejMp8IrVQmVgbhRQOWargRGHarf/t5bS',
            estado: 'HABILITADO',
            roles: {
                connect: [{ id: 3 }] //va a ser solo vendedor
            }
        }
    });
    //usuario vendedor y cliente 1 ID:6
    await prisma.usuario.create({
        data: {
            nombreCompleto: 'Jorge Castro Soto',
            identificacion: '244634434',
            numeroTelefono: '8745-6663',
            correoElectronico: 'jorge@closetbypaula.com',
            contrasena: '$2b$10$ISRL9waHWkiF7vUEmkpOc.ARjBgM0Zoc7yKa3z8ua9NATxgC6gIxK',
            estado: 'HABILITADO',
            roles: {
                connect: [{ id: 2 }, { id: 3 }] //va a ser cliente y vendedor
            }
        }
    });

    //inserts de la tabla direcciones 
    //ID usuario :3
    await prisma.direccion.create({
        data: {
            provincia: "Alajuela",
            canton: "San Carlos",
            distrito: "Quesada",
            direccion: "Cedral, Casa azul",
            codigoPostal: "21001",
            telefono: "11111111",
            cliente: {
                connect: { id: 3 }
            }

        }
    });
    //ID:4
    await prisma.direccion.create({
        data: {
            provincia: "Heredia",
            canton: "Belen",
            distrito: "La Rivera",
            direccion: "Diagonal Cangrejo Rojo",
            codigoPostal: "47001",
            telefono: "22222222",
            cliente: {
                connect: { id: 4 }
            }

        }
    });
    //ID:5
    await prisma.direccion.create({
        data: {
            provincia: "Guanacaste",
            canton: "Liberia",
            distrito: "Liberia",
            direccion: "150 metros oeste del Mcdonalds",
            codigoPostal: "50101",
            telefono: "33333333",
            cliente: {
                connect: { id: 5 }
            }

        }
    });
    //ID:6
    await prisma.direccion.create({
        data: {
            provincia: "Alajuela",
            canton: "Alajuela",
            distrito: "Alajuela",
            direccion: "250 metros Norte del CityMall",
            codigoPostal: "20101",
            telefono: "44444444",
            cliente: {
                connect: { id: 6 }
            }

        }
    });


    //inserts de la tabla metodos de pago 
    //ID:3
    await prisma.metodoPago.create({
        data: {
            tipo: "Tarjeta Credito",
            proveedor: "BAC",
            numeroCuenta: "1111-2222-3333-4444",
            fechaExpiracion: "2/2030",
            cliente: {
                connect: { id: 3 }
            }

        }
    });
    //ID:4
    await prisma.metodoPago.create({
        data: {
            tipo: "Tarjeta Debito",
            proveedor: "BCR",
            numeroCuenta: "4444-3333-2222-1111",
            fechaExpiracion: "2/2030",
            cliente: {
                connect: { id: 4 }
            }

        }
    });
    //ID:5
    await prisma.metodoPago.create({
        data: {
            tipo: "Tarjeta Credito",
            proveedor: "BN",
            numeroCuenta: "0000-9999-8888-7777",
            fechaExpiracion: "2/2030",
            cliente: {
                connect: { id: 5 }
            }

        }
    });
    //ID:6
    await prisma.metodoPago.create({
        data: {
            tipo: "Tarjeta Debito",
            proveedor: "BP",
            numeroCuenta: "5555-6666-7777-8888",
            fechaExpiracion: "2/2030",
            cliente: {
                connect: { id: 6 }
            }

        }
    });

   //inserts de la tabla producto
    //ID 1
    await prisma.producto.create({
        data: {
            nombre: "Vestido polo",
            descripcion: "The Children's Place Vestido polo piqué para niña",
            precio: 5500,
            cantidad: 5,
            estado: "Nuevo",
            categoriaId: 2,
            vendedorId: 5,
        }
    });
    //ID 2
    await prisma.producto.create({
        data: {
            nombre: "French Toast Jersey",
            descripcion: "French Toast Jersey con dobladillo plisado para niña con cinta, 60 % algodón, 40 % poliéster",
            precio: 9900,
            cantidad: 6,
            estado: "Nuevo",
            categoriaId: 2,
            vendedorId: 6,
        }
    });
    //ID 3
    await prisma.producto.create({
        data: {
            nombre: "vestido - flores",
            descripcion: "HILEELANG Vestidos de manga corta para niñas pequeñas, vestido de verano de algodón casual con vuelo",
            precio: 7000,
            cantidad: 1,
            estado: "Usado-Como nuevo",
            categoriaId: 1,
            vendedorId: 5,
        }
    });
    

    //inserts de la tabla foto
    //ID 1
    await prisma.foto.create({
        data: {
            url:"/uploads/vestidopolonegro1.jpg",
            productoId: 1,
        }
    })
    //ID 2
    await prisma.foto.create({
        data: {
            url: "/uploads/vestidopolonegro2.jpg",
            productoId: 1,
        }
    })
    //ID 3
    await prisma.foto.create({
        data: {
            url: "/uploads/vestidotoastjersey1.jpg",
            productoId: 2,
        }
    })
    //ID 4
    await prisma.foto.create({
        data: {
            url: "/uploads/vestidotoastjersey2.jpg",
            productoId: 2,
        }
    }) 
    //ID 5
    await prisma.foto.create({
        data: {
            url: "/uploads/HILEELANGVestido1.jpg",
            productoId: 3,
        }
    })
    //ID 6
    await prisma.foto.create({
        data: {
            url: "/uploads/HILEELANGVestido2.jpg",
            productoId: 3,
        }
    }) 


    //inserts de la tabla pregunta | Solo 1
    await prisma.pregunta.create({
        data: {
            mensaje: "¿Que tipo de tela son las camisas?",
            respuesta: "Las camisas son hechas 100% algodon",
            producto: { connect: { id: 1 } },
            cliente: { connect: { id: 3 } }
        }
    })

    //inserts de la tabla pregunta | Solo 1
    await prisma.pregunta.create({
        data: {
            mensaje: "¿Que tipo de tela es hecho este producto?",
            respuesta: "Este productos es hecho 100% algodon",
            producto: { connect: { id: 1 } },
            cliente: { connect: { id: 3 } }
        }
    })

    //inserts de la tabla pregunta |
    await prisma.pregunta.create({
        data: {
            mensaje: "¿Que colores tienen de este estilo?",
            respuesta: "Tenemos en azul, verde y amarillo",
            producto: { connect: { id: 2 } },
            cliente: { connect: { id: 3 } }
        }
    })

    //inserts de la tabla pregunta 3|
    await prisma.pregunta.create({
        data: {
            mensaje: "¿Que colores tienen de este estilo?",
            respuesta: "Tenemos en rojo, azul y amarillo",
            producto: { connect: { id: 3 } },
            cliente: { connect: { id: 4 } }
        }
    })

    //inserts de la tabla compras
    //compra 1
    await prisma.compra.create({
        data:
        {
            impuestos: 13.00,
            total: 45000,
            clienteId: 3,
            metodoId: 1,
            direccionId: 1,
            //Articulos 
            detallesOrden: {
                createMany: {
                    data: [
                        { lineaDetalle: 1, productoId: 3, cantidad: 1 },
                    ]
                }
            }
        }
    });

    //compra 2
    await prisma.compra.create({
        data:
        {
            impuestos: 13.00,
            total: 50000,
            clienteId: 4,
            metodoId: 2,
            direccionId: 2,
            //Articulos 
            detallesOrden: {
                createMany: {
                    data: [
                        { lineaDetalle: 1, productoId: 2, cantidad: 2 },
                        { lineaDetalle: 2, productoId: 3, cantidad: 1 }
                    ]
                }
            }
        }
    });

    //Compra 3
    await prisma.compra.create({
        data:
        {
            impuestos: 13.00,
            total: 7500,
            clienteId: 4,
            metodoId: 2,
            direccionId: 2,
            //Articulos 
            detallesOrden: {
                createMany: {
                    data: [
                        { lineaDetalle: 1, productoId: 1, cantidad: 2 },
                        { lineaDetalle: 2, productoId: 2, cantidad: 1 }
                    ]
                }
            }
        }
    })

    //Compra 4
    await prisma.compra.create({
        data:
        {
            impuestos: 13.00,
            total: 14400,
            clienteId: 4,
            metodoId: 2,
            direccionId: 2,
            //Articulos 
            detallesOrden: {
                createMany: {
                    data: [
                        { lineaDetalle: 1, productoId: 1, cantidad: 1 },
                        { lineaDetalle: 2, productoId: 2, cantidad: 1 }
                    ]
                }
            }
        }
    })
    //Compra 5
    await prisma.compra.create({
        data:
        {
            impuestos: 13.00,
            total: 5500,
            clienteId: 4,
            metodoId: 2,
            direccionId: 2,
            //Articulos 
            detallesOrden: {
                createMany: {
                    data: [
                        { lineaDetalle: 2, productoId: 1, cantidad: 1 }
                    ]
                }
            }
        }
    })


    //compra 6
    await prisma.compra.create({
        data:
        {
            impuestos: 13.00,
            total: 2000,
            clienteId: 3,
            metodoId: 1,
            direccionId: 1,
            //Articulos 
            detallesOrden: {
                createMany: {
                    data: [
                        { lineaDetalle: 1, productoId: 3, cantidad: 1 },
                    ]
                }
            }
        }
    });

    //compra 7
    await prisma.compra.create({
        data:
        {
            impuestos: 13.00,
            total: 3900,
            clienteId: 3,
            metodoId: 1,
            direccionId: 1,
            //Articulos 
            detallesOrden: {
                createMany: {
                    data: [
                        { lineaDetalle: 1, productoId: 2, cantidad: 1 },
                    ]
                }
            }
        }
    });

    //compra 8
    await prisma.compra.create({
        data:
        {
            impuestos: 13.00,
            total: 2000,
            clienteId: 3,
            metodoId: 1,
            direccionId: 1,
            //Articulos 
            detallesOrden: {
                createMany: {
                    data: [
                        { lineaDetalle: 1, productoId: 1, cantidad: 1 },
                    ]
                }
            }
        }
    });


    //inserts de la tabla evaluacion

    //evalucion de la compra 1
    await prisma.evaluacion.create({
        data: {
            calificacion: 3,
            comentario: 'Muy buen servicio brindado por el vendedor, el producto me gusto mucho',
            compraId: 1,
            tipoUsuario: 'CLIENTE',
            evaluadorId: 3,
            evaluadoId: 5

            //usuario: { connect: { id: 3 } },
        }
    });

    //evalucion de la compra 2
    await prisma.evaluacion.create({
        data: {
            calificacion: 4,
            comentario: 'Excelente servicio brindado por el cliente,amable',
            compraId: 2,
            tipoUsuario: 'VENDEDOR',
            evaluadorId: 5,
            evaluadoId: 6
            //usuario: { connect: { id: 5 } },
        }
    });

}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });