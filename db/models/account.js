const mongoose = require('mongoose');

let accountSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    bio: String
});

module.exports = mongoose.model('account', accountSchema);