const mongoose = require('mongoose');
const passport = require('passport-local-mongoose');

let accountSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bio: String
});

accountSchema.plugin(passport, { 
    usernameField: 'email'
});

module.exports = mongoose.model('account', accountSchema);