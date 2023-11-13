const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

//Retornando todos los contactos
router.get("/",contactsController.getAllContacts);

//Retornando un contacto dado su id
//router.get("/:id",contactsController.getByIdContact);

//Crear un contacto
router.post("/create", contactsController.extractUserId, contactsController.createContact);

//recuperar contact
router.get("/:userId", contactsController.getContactByUserId);

//Actualizar un contacto
router.put("/:id",contactsController.updateContact);

//Eliminar contacto
router.delete("/:id",(req, res, next) => req.app.verifyToken(req, res, next),contactsController.deleteContact);

module.exports = router;