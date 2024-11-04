const mongoose = require("mongoose");
const Loan = require('../model/loan.model');

async function SetLoanButtonController(req, res) {
    try {
        const userid = req.params.userid;
        console.log('userid', userid)

        // Find the user's loan that is not paid and is approved
        const user = await Loan.findOne({ id: userid, paid: false, status: "Approved" });

        if (!user) {
            return res.status(404).json({
                message: "Loan not found or already paid."
            });
        }

        // Increment the number of payments made
        user.numofpaid += 1;

        // Update the user's loan record
        const updatedUser = await Loan.findByIdAndUpdate(user._id, { numofpaid: user.numofpaid }, { new: true });

        // Check if the loan is fully paid
        if (user.numofpaid >= user.term) {
            // const paid = user.paid;
            const updatedUser = await Loan.findByIdAndUpdate(user._id, {paid : true} ,{ new: true });
            return res.status(200).json({
                message: "Loan Paid 👍👍",
                paid: true
            });
        }

        // Respond with the updated user loan info
        return res.status(200).json({
            message: "Payment recorded.",
            paid: false,
            updatedUser
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            message: "Failed in the loan system",
            error: error.message
        });
    }
}

module.exports = SetLoanButtonController;
