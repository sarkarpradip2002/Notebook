const mongoose = require('mongoose');

const userdetails = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

});

module.exports=mongoose.model('userdata',userdetails);