const UsersModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async function (req, res, next) {
  try {
    const documents = await UsersModel.find();
    res.status(200).json({users:documents});
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getByIdUser = async function (req, res, next) {
  try {
    const document = await UsersModel.findById(req.params.id);
    res.status(200).json({user:document});
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

const createUser = async function (req, res, next) {
  try {

    const existingUser = await UsersModel.findOne({ email: req.body.email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({
        "success": false,
        "message": "El usuario ya existe",
        "userExists": true
      }
      );
    }

    const user = new UsersModel({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      province: req.body.province,
      city: req.body.city,
      address: req.body.address,
      birthdate: req.body.birthdate,
      password: req.body.password,
      repeatpassword: req.body.repeatpassword,
    });

    const document = await user.save();
    res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};


const updateUser = async function (req, res, next) {
  try {
    const user = await UsersModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const document = await UsersModel.updateOne({ _id: req.params.id }, req.body);
    console.log("Resultado de la actualización:", document);
    if (document.nModified === 0) {
      return res.status(204).json({ message: "Nada que modificar" });
    }
    res.status(204).json({ message: "El usuario ha sido modificado" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteUser = async function (req, res, next) {
  try {
    console.log(req.query);
    await UsersModel.deleteOne({ _id: req.params.id });
    res.status(204).json({message:"El usuario ha sido eliminado"});
  } catch (e) {
    console.log(e);
  }
};

const login = async function (req, res, next) {
  try {
    const document = await UsersModel.findOne({ email: req.body.email });
    if (!document) {
      return res.json({ message: "El email y/o contraseña son incorrectos" });
    }

    if (bcrypt.compareSync(req.body.password, document.password)) {
      // Incluir los campos name, lastname, y email en el token
      const tokenPayload = {
        userId: document._id,
        name: document.name,
        lastname: document.lastname,
        email: document.email,
      };

      const token = jwt.sign(
        tokenPayload,
        req.app.get("secretKey"),
        {
          expiresIn: "1h",
        }
      );

      // Respondemos con el token y los campos name, lastname, y email
      res.json({
        token
      });
    } else {
      return res.json({ message: "El email y/o contraseña son incorrectos" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
};


const extractUserId = async function (req, res, next) {
  try {
    const token = req.body.token; // Supongo que el token se envía en el header 'Authorization'
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, req.app.get('secretKey'), (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      const userId = decoded.userId; // Extraer el ID de usuario del token decodificado
      req.userId = userId; // Asignar el ID del usuario a req para su uso en otros controladores
      next();
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {getAllUsers,getByIdUser,createUser,updateUser,deleteUser,login,extractUserId};