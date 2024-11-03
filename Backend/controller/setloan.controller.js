const mongoose = require("mongoose");
const Loan = require('../model/loan.model')

async function SetLoanController(req,res){
    let state = false;
    try {
        const userid = req.params.userid;
        const {amount, id, term, date, status, numofpaid, paid} = req.body;
        // console.log(userid,id)

        const user = await Loan.find({id : userid});

        // console.log(user);

        if(user.length == 0){
            const resp = await Loan.create({
                id,
                amount,
                term,
                date,
                status,
                numofpaid,
                paid
            })

            return res.status(200).json({
                message: "Loan Application Created👍👍",
                data : resp
            })
        }
        else {
            for(let i=0; i<user.length; i++){
                if(user[i].paid && user[i].status == "Approved"){
                    state = true;
                }
                else{
                    state = false;
                }
            }
        }

        if(state){
            const resp = await Loan.create({
                id,
                amount,
                term,
                date,
                status,
                numofpaid,
                paid
            })

            return res.status(200).json({
                message: "Loan Application Created👍👍",
                data : resp
            })
        }
        else{
            return res.status(400).json({
                message: "please pay previous loan🙏🙏",
            })
        }
        

    } catch (error) {
        return res.json({
                message: "fail in the loan system",
        })
    }
}

module.exports = SetLoanController;