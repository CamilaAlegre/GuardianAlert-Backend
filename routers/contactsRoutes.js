const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

//Retorn todos los contactos
router.get("/",contactsController.getAllContacts);

//Crear un contacto
router.post("/create", contactsController.createContact);

//Recuperar contact
router.get("/:userId", contactsController.getContactByUserId);

//Actualizar un contacto
router.put("/:userId",contactsController.updateContact);

//Eliminar contacto
router.delete("/:id",(req, res, next) => req.app.verifyToken(req, res, next),contactsController.deleteContact);

module.exports = router;