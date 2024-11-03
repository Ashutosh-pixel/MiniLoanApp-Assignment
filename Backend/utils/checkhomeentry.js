function CheckHomeEntry(req,res,next){
    const {amount, id, term, date, status, numofpaid, paid} = req.body;
    const userid = req.params.userid;

    if (amount != '' && id != '' && term != '' && date != '' && status != '' && numofpaid != '' && paid != '') {
        if(id === userid){
            next();
        }
        else {
            return res.status(400).json({
                message : "you are not an authentic user"
            })
        }
    }
    else {
        return res.status(400).json({
            message: "require all fields"
        })
    }
}

module.exports = CheckHomeEntry