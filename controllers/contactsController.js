const ContactsModel = require('../models/contactModel');
const jwt = require('jsonwebtoken');

const getAllContacts = async function (req, res, next) {
  try {
    const documents = await ContactsModel.find();
    res.status(200).json({contacts:documents});
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getContactByUserId = async function (req, res, next) {
  try {
    const userId = req.params.userId; // Obtener el userId de los parámetros de la solicitud

    const contact = await ContactsModel.findOne({ user: userId });
    if (!contact) {
      return res.status(404).json({ message: "No se encontró contacto para este usuario" });
    }

    res.status(200).json({ contact });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


const getByIdContact = async function (req, res, next) {
  try {
    const document = await ContactsModel.findById(req.params.id);
    res.status(200).json({contacts:document});
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

const createContact = async function (req, res, next) {
  try {
    const contact = new ContactsModel({
      name: req.body.name,
      lastname: req.body.lastname,
      phoneNumber: req.body.phoneNumber,
      relationship: req.body.relationship,
      user: req.userId, // Asociar el ID de usuario con el contacto
    });

    const document = await contact.save();
    res.status(201).json({ contact: document });
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

const updateContact = async function (req, res, next) {
  try {
    const contact = await ContactsModel.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }
    const document = await ContactsModel.updateOne({ _id: req.params.id }, req.body);
    console.log("Resultado de la actualización:", document);
    if (document.nModified === 0) {
      return res.status(204).json({ message: "Nada que modificar" });
    }
    res.status(200).json({ message: "El contacto ha sido modificado" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error interno del servidor al actualizar el contacto" });
  }
};


const deleteContact = async function (req, res, next) {
  try {
    console.log(req.query);
    await ContactsModel.deleteOne({ _id: req.params.id });
    res.status(204).json({message:"El contacto ha sido eliminado"});
  } catch (e) {
    console.log(e);
  }
};

module.exports = {getAllContacts,getByIdContact,createContact,updateContact,extractUserId,deleteContact,getContactByUserId};