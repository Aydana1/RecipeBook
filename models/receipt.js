var mongoose = require('mongoose');

// SCHEMA SETUP
var receiptSchema = new mongoose.Schema({
    foodName: String,
    ingredients: String,
    author: String,
    image: String
});

module.exports = mongoose.model('Receipt', receiptSchema);