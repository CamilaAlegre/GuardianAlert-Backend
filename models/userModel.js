const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    lastname: {
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    email:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    phoneNumber:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    country:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    province:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    city:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    address:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    birthdate:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    password:{
        type:String,
        required:[true,"El campo es obligatorio"]
    },
    repeatpassword:{
        type:String,
        required:[true,"El campo es obligatorio"]
    }
});

userSchema.pre("save", function(next){
    this.password=bcrypt.hashSync(this.password,10);
    this.repeatpassword=bcrypt.hashSync(this.repeatpassword,10);
    next();
});

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
