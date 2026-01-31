const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getByVendedor = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const preguntas = await prisma.producto.findUnique({
    where: {
      id: id,
    },
    select: {
      id:true,
      nombre:true,
      preguntas: true,
    },
  });
  response.json(preguntas);
};

//Crear
module.exports.create = async (request, response, next) => {
  let pregunta = request.body;
  const newPregunta = await prisma.pregunta.create({
    data: {
      productoId: parseInt(pregunta.productoId),
      clienteId: parseInt(pregunta.clienteId),
      mensaje: pregunta.mensaje,
      respuesta: "",
    },
  });
  response.json(newPregunta);
};

//Actualizar
module.exports.update = async (request,response, next)=>{
  let pregunta = request.body;
  let idPregunta=parseInt(request.params.id);
  //Obtener la respuesta vieja
  const preguntaVieja = await prisma.pregunta.findUnique({
    where:{ id:idPregunta},
  })

  const preguntaNueva =await prisma.pregunta.update({
    where:{
      id:idPregunta
    },
    data: {
      mensaje: preguntaVieja.mensaje,
      respuesta: pregunta.respuesta
    }
  });
  response.json(preguntaNueva)
}
