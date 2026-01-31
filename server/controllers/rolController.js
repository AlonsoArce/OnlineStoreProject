const { PrismaClient, Role } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  // let listRoles = [];
  // for (let element in Role) {
  //   switch (element) {
  //     case Role.ADMIN:
  //       listRoles.unshift({
  //         ["id"]: element,
  //         ["nombre"]: "Administrador",
  //       });
  //       break;
  //     case Role.USER:
  //       listRoles.unshift({
  //         ["id"]: element,
  //         ["nombre"]: "Cliente",
  //       });
  //       break;
  //     case Role.SELLER:
  //       listRoles.unshift({
  //         ["id"]: element,
  //         ["nombre"]: "Vendedor",
  //       });
  //       break;
  //     default:
  //       listRoles.unshift({ ["id"]: Role.CLIENT, ["nombre"]: "Cliente" });
  //       break;
  //   }
  // }

  

  response.json();
};
module.exports.getById = async (request, response, next) => {
  // let id = request.params.id;
  // let nombre = "";
  // switch (Role[id]) {
  //   case Role.ADMIN:
  //     nombre = "Administrador";
  //     break;
  //   case Role.USER:
  //     nombre = "Usuario";
  //     break;
  //   default:
  //     nombre = "Usuario";
  //     break;
  // }
  // let rol = { ["id"]: Role[id], ["nombre"]: nombre };
  response.json();
};
