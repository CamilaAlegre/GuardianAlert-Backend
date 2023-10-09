const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    lastname: {
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    phoneNumber:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    relationship:{
        type:String,
        required:[true,"El campo es obligatorio"]
    }
});

const contactsModel = mongoose.model("contacts", contactSchema);

module.exports = contactsModel;
