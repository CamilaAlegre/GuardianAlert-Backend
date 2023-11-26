const ContactsModel = require('../models/contactModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    const contact = await ContactsModel.findOne({ user: req.params.userId });

    if (!contact) {
      // Si no hay contacto, simplemente envía una respuesta indicando que no hay contacto existente
      return res.status(200).json({ message: 'No hay contacto existente para este usuario.' });
    }

    res.status(200).json({ contact });
  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ message: 'Error interno del servidor' });
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
    console.log(req.body);
    const contact = new ContactsModel({
      name: req.body.name,
      lastname: req.body.lastname,
      phoneNumber: req.body.phoneNumber,
      relationship: req.body.relationship,
      user: req.body.user, // Utiliza directamente el userId que está en el req
    });
    console.log(contact);

    const document = await contact.save();
    res.status(201).json({ contact: document });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Error al crear el contacto' });
  }
};

const updateContact = async function (req, res, next) {
  try {
    // Busca el contacto por el campo 'user'
    const contact = await ContactsModel.findOne({ user: req.params.userId });

    if (!contact) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }

    // Actualiza el contacto encontrado con los datos proporcionados en el cuerpo de la solicitud
    const document = await ContactsModel.updateOne({ user: req.params.userId }, req.body);

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

module.exports = {getAllContacts,getByIdContact,createContact,updateContact,deleteContact,getContactByUserId};