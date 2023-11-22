const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
    date:{
        type:String,
    },
    place: {
        type:String,
    },
    type:{
        type:String,
    },
    status:{
        type:String,
    },
    user:{
        type:String
    }
});

const eventsModel = mongoose.model("events", eventsSchema);

module.exports = eventsModel;
