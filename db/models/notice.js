const mongoose = require('mongoose');

let noticeSchema = new mongoose.Schema({
    title: String,
    content: String,
    level: Number,
    createdAt: Date
});

module.exports = mongoose.model('notice', noticeSchema);