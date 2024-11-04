const express = require('express');
const SetLoanController = require('../controller/setloan.controller');
const passport = require('../utils/passport-config');
const CheckHomeEntry = require('../utils/checkhomeentry');
const route = express.Router();
const jwt = require('jsonwebtoken');
const GetLoanController = require('../controller/getloan.controller');
const SetLoanButtonController = require('../controller/setloanbutton.controller');


route.post('/:userid',CheckHomeEntry,SetLoanController)
route.get('/:userid', GetLoanController)
route.post('/button/:userid', SetLoanButtonController)


module.exports = route;