const mongoose = require('mongoose');

let problemSchema = new mongoose.Schema({
    id: Number,
    content: String,
    input_file: String,
    output_file: String
});

module.exports = mongoose.model('notice', problemSchema);