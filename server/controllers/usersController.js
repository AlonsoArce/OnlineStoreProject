const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
//--npm install bcrypt
const bcrypt = require("bcrypt");

//Obtener listado
module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({});
  response.json(usuarios);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: id,
    },
  });
  response.json(usuario);
};

//Obtener listado de todos los usuarios habilitados
module.exports.getByEstadoHabilitado = async (request, response, next) => {
  const usuario = await prisma.usuario.findMany({
    where: {
      estado: "HABILITADO",
    },
    select: {
      id: true,
      nombreCompleto: true,
      identificacion: true,
      numeroTelefono: true,
      correoElectronico: true,
      estado: true,
    },
  });
  response.json(usuario);
};

//Obtener listado de todos los usuarios deshabilitados
module.exports.getByEstadoDeshabilitado = async (request, response, next) => {
  const usuario = await prisma.usuario.findMany({
    where: {
      estado: "DESHABILITADO",
    },
    select: {
      id: true,
      nombreCompleto: true,
      identificacion: true,
      numeroTelefono: true,
      correoElectronico: true,
      estado: true,
    },
  });
  response.json(usuario);
};

//Actualizar estado del usuario habilitado a deshabilitado
module.exports.updateEstadoADeshabilitado = async (request, response, next) => {
  let idUsuario = parseInt(request.params.id);
  console.log(idUsuario);
  const usuario = await prisma.usuario.update({
    where: {
      id: idUsuario,
    },
    data: {
      estado: "DESHABILITADO",
    },
  });
  response.json(usuario);
};

//Actualizar estado del usuario deshabilitado a habilitado
module.exports.updateEstadoAHabilitado = async (request, response, next) => {
  let idUsuario = parseInt(request.params.id);
  const usuario = await prisma.usuario.update({
    where: {
      id: idUsuario,
    },
    data: {
      estado: "HABILITADO",
    },
  });
  response.json(usuario);
};

//Registrar nuevo usuario
module.exports.register = async (request, response, next) => {
  const userData = request.body;
  console.log(userData);
  //Salt es una cadena aleatoria.
  //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
  // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
  let salt = bcrypt.genSaltSync(10);
  // Hash password
  let hash = bcrypt.hashSync(userData.contrasena, salt);

  const user = await prisma.usuario.create({
    data: {
      nombreCompleto: userData.nombreCompleto,
      correoElectronico: userData.correoElectronico,
      identificacion: userData.identificacion,
      numeroTelefono: userData.numeroTelefono,
      contrasena: hash,
      estado: "HABILITADO",
      roles: {
        connect: userData.roles.map(id=> ({ id }))
      }
    },
  });
  response.status(200).json({
    status: true,
    message: "Usuario creado",
    data: user,
  });
};

module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.Usuario.findUnique({
    where: {
      correoElectronico: userReq.correoElectronico,
    },
    include:{
      roles:{select:{tipo:true}}
    }
  });
  console.log(userReq)
  console.log(user)

  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
  //Verifica la contraseña
  const checkPassword = await bcrypt.compare(userReq.contrasena, user.contrasena);
  if (checkPassword === false) {
    response.status(401).send({
      success: false,
      message: "Credenciales invalidas",
    });
  } else {
    //Usuario correcto
    //Crear el payload
    const payload = {
      correoElectronico: user.correoElectronico,
      roles: user.roles,
    };
    console.log(user.roles)

    //Crear el token
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    response.json({
      success: true,
      message: "usuario registrado",
      data: {
        user,
        token,
      },
    });
  }
};

//Actualizar
module.exports.update = async (request, response, next) => {};
