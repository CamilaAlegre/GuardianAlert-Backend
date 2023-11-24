const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventController');
const detectEventsController = require('../controllers/detectEventsController');

//Retornando todos los eventos
router.get("/",eventsController.getAllEvents);

router.get("/:id",eventsController.getEventsByUserId);

//Crear un evento
router.post("/create",eventsController.createEvent);

//Eliminar evento
router.delete("/:id",eventsController.deleteEvent);

// Ruta para manejar solicitudes POST con el JSON de datos
router.post('/', (req, res) => {
    detectEventsController.detectEvents(req, res);
});


module.exports = router;