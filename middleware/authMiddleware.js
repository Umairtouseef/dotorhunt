const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: true });
const sessionAuth = passport.authenticate('session', { session: true });

module.exports = { jwtAuth, sessionAuth };
