const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventController');

//Retornando todos los eventos
router.get("/",eventsController.getAllEvents);

//Retornando un evento dado su id
router.get("/:id",eventsController.getByIdEvent);

//Crear un evento
router.post("/create",eventsController.createEvent);

//Eliminar evento
router.delete("/:id",eventsController.deleteEvent);

module.exports = router;