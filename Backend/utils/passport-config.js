const passport = require('passport');
const User = require('../model/user.model');
const dotenv = require('dotenv');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

dotenv.config();

const cookieExtractor = req => req?.cookies?.['token'] || null;

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id); // More concise
        return user ? done(null, user) : done(null, false);
    } catch (error) {
        console.error('Error during user lookup:', error);
        return done(error, false);
    }
}));

module.exports = passport;
