const EventsModel = require('../models/eventModel');

const getAllEvents = async function (req, res, next) {
  try {
    const documents = await EventsModel.find();
    res.status(200).json({events:documents});
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getByIdEvent = async function (req, res, next) {
  try {
    const document = await EventsModel.findById(req.params.id);
    res.status(200).json({events:document});
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

const createEvent = async function (req, res, next) {
  try {
    const event = new EventsModel({
      date: req.body.fecha,
      place: req.body.lugar,
      type: req.body.tipo,
      status: req.body.estado,
      user:req.body.user
    });
    console.log(event)

    const document = await event.save();
    res.status(201).json({ event: document });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
};

const deleteEvent= async function (req, res, next) {
  try {
    console.log(req.query);
    await EventsModel.deleteOne({ _id: req.params.id });
    res.status(204).json({message:"El Evento ha sido eliminado"});
  } catch (e) {
    console.log(e);
  }
};

const getEventsByUserId = async function (req, res, next) {
  try {
    const userId = req.params.id; // Obtiene el ID del usuario de los parámetros de la solicitud

    const events = await EventsModel.find({ user: userId }); // Busca todos los eventos asociados al usuario con este ID

    console.log(events);

    if (!events) {
      return res.status(404).json({ message: "No se encontraron eventos para este usuario" });
    }

    res.status(200).json({ events }); // Responde con los eventos encontrados
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


module.exports = {getAllEvents,getByIdEvent,createEvent,deleteEvent,getEventsByUserId };