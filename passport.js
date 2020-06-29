const passport = require('passport');
const account = require('./db/models/account');

passport.use(account.createStrategy());
passport.serializeUser(account.serializeUser());
passport.deserializeUser(account.deserializeUser());