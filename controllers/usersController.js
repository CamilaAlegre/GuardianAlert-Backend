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
    // Verifica si el usuario ya existe en la base de datos

    const existingUser = await UsersModel.findOne({ email: req.body.email });

    if (existingUser) {
      // El usuario ya existe, devuelve un mensaje de error
      return res.status(400).json({ success: false, message: 'El usuario ya existe' });
    }

    // El usuario no existe, procede a crearlo
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
    const document = await UsersModel.findOne({email:req.body.email});
    if(!document){
      return res.json({message:"El email y/o contraseña son incorrectos"});
    }
    if (bcrypt.compareSync(req.body.password, document.password)) {
      const token = jwt.sign(
        { userId: document._id },
        req.app.get("secretKey"),
        {
          expiresIn: "1h",
        }
      );
      res.json(token);
    }else{
      return  res.json({message:"El email y/o contraseña son incorrectos"});
    }

  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
};

module.exports = {getAllUsers,getByIdUser,createUser,updateUser,deleteUser,login};