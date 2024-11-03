const mongoose = require("mongoose");
const Loan = require('../model/loan.model')

async function GetLoanController(req,res){
    let state = false;
    let unpaid = [];
    let paidloan = [];
    try {
        const userid = req.params.userid;
        // const {amount, id, term, date, status, numofpaid, paid} = req.body;
        // console.log(userid,id)

        const user = await Loan.find({id : userid});

        unpaid = user;

        // console.log(user);

        if(user.length == 0){
            return res.status(200).json({
                message: "please apply for loan",
                apply : true,
                data : unpaid,
                loanhistory : paidloan
            })
        }
        else {
            for(let i=0; i<user.length; i++){
                if(user[i].paid && user[i].status == "Approved"){
                    state = true;
                    paidloan.push(user[i]);
                }
                else{
                    state = false;
                    unpaid = user[i];
                }
            }
        }

        if(!state){
            return res.status(200).json({
                message: "Loan is Runing👍👍",
                apply: false,
                data : unpaid,
                loanhistory : paidloan
            })
        }
        else{
            return res.status(200).json({
                message: "please apply for loan",
                apply : true,
                data : unpaid,
                loanhistory : paidloan
            })
        }
        

    } catch (error) {
        return res.json({
                message: "fail in the loan system",
        })
    }
}

module.exports = GetLoanController;