const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
    date:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    place: {
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    type:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    status:{
        type:String,
        required:[true,"El campo es obligatorio"]
    }
});

const eventsModel = mongoose.model("events", eventsSchema);

module.exports = eventsModel;
