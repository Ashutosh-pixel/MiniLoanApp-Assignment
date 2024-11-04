const mongoose = require("mongoose");
const Loan = require('../model/loan.model')

async function GetAllLoansController(req,res){
    try {
        const users = await Loan.find({});

        if(!users){
            return res.status(200).json({
                nothing : true,
                users: []
            });
        }

        return res.status(200).json({
                nothing : false,
                users : users
        });

    } catch (error) {
        return res.json({
                message: "fail in the loan system",
        })
    }
}

module.exports = GetAllLoansController;