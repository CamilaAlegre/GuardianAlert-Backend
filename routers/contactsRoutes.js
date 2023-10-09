const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

//Retornando todos los contactos
router.get("/",(req, res, next) => req.app.verifyToken(req, res, next),contactsController.getAllContacts);

//Retornando un contacto dado su id
router.get("/:id",(req, res, next) => req.app.verifyToken(req, res, next),contactsController.getByIdContact);

//Crear un contacto
router.post('/register', contactsController.createContact);

//Actualizar un contacto
router.put("/:id",(req, res, next) => req.app.verifyToken(req, res, next),contactsController.updateContact);

//Eliminar contacto
router.delete("/:id",(req, res, next) => req.app.verifyToken(req, res, next),contactsController.deleteContact);

module.exports = router;