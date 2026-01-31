const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* Lista las categorias */
module.exports.get = async (request, response, next) => {
    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nombre: "asc",
      },
      select: {
        id:true,
        nombre: true,     
      },
    });
    response.json(categorias);
  };