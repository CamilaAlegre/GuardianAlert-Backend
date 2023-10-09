const ContactsModel = require('../models/contactModel');

const getAllContacts = async function (req, res, next) {
  try {
    const documents = await ContactsModel.find();
    res.status(200).json({contacts:documents});
  } catch (e) {
    console.log(e);
    next(e);
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
        name:req.body.name,
        lastname: req.body.lastname,
        phoneNumber:req.body.phoneNumber,
        relationship:req.body.relationship
    });
    const document = await contact.save();
    res.status(201).json({contact:document});
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
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
    res.status(204).json({ message: "El contatcto ha sido modificado" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error interno del servidor" });
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

module.exports = {getAllContacts,getByIdContact,createContact,updateContact,deleteContact};