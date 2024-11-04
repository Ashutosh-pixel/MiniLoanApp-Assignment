const mongoose = require("mongoose");
const Loan = require('../model/loan.model');

async function ChangeStateController(req, res) {
    try {
        const { userid } = req.body;
        const user = await Loan.findOneAndUpdate(
            { id: userid, status: "Pending" },
            { status: "Approved" },
            { new: true }
        );

        if (!user) {
            return res.status(200).json({
                nothing: true,
                users: []
            });
        }

        return res.status(200).json({
            nothing: false,
            users: user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Fail in the loan system",
        });
    }
}

module.exports = ChangeStateController;
