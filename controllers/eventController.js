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
      type: req.body.tipoEvento,
      status: req.body.estado,
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

module.exports = {getAllEvents,getByIdEvent,createEvent,deleteEvent};