const mongoose = require('mongoose')

const loan = new mongoose.Schema({
    amount : {
        type : Number,
        required : true,
        default : 0
    },
    id : {
        type : String,
        required : true,
    },
    term : {
        type : Number,
        required : true,
        default : 0
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    status:{
        type: String,
        required : true,
        default : "Pending"
    },
    numofpaid:{
        type : Number,
        required : true,
        default : 0
    },
    paid :{
        type: Boolean,
        required : true,
        default : false
    }
})

const Loan = mongoose.model("Loan", loan);

module.exports = Loan;