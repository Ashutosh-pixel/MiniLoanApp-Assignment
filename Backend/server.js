const cookieParser = require('cookie-parser');
const express = require('express');
const dbConnect = require('./config/database');
const dotenv = require('dotenv');
const User = require('./model/user.model');
const authroute = require('./route/auth.route');
const passport = require('./utils/passport-config');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const homeroute = require('./route/home.route');
const GetAllLoansController = require('./controller/getallloans.controller');
const ChangeStateController = require('./controller/changestate.controller');

const app = express();
const PORT = 3000;

dotenv.config();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Change this to your frontend URL
    credentials: true // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authroute);

app.use('/home',homeroute);

app.get('/admin', GetAllLoansController);

app.post('/changestate', ChangeStateController)

// Protected route example
// app.get("/home", (req, res, next) => {
//     passport.authenticate('jwt', { session: false }, (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return res.status(401).json({ message: "Error in the token" });
//         }
//         req.user = user;
//         console.log(user);
//         next();
//     })(req, res, next);
// }, (req, res) => {
//     res.send("Welcome to the home page!"); 
// });
// Start server and connect to the database
dbConnect(); // Ensure DB connection before starting server
app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});
