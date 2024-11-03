const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    //works in both authentication
    fullname : {
        type : String,
        required : true,
    },
    username: {
        type : String,
        required : true
    },
    password: {
        type: String,
        // select: false
        // required : true
    },
    profile : {
        type : String,
        default : 'user'
    }
})

const User = mongoose.model('User', userschema);

module.exports = User;