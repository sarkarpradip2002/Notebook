const mongoose = require('mongoose');

const notedetails = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    user:{
        type:String
    },
    tag: {
        type: String,
    },

    data: {
        type: String,
    }
});

module.exports=mongoose.model('Notes',notedetails);