var mongoose = require('mongoose');

// SCHEMA SETUP
var receiptSchema = new mongoose.Schema({
    foodName: String,
    ingredients: String,
    duration: String,
    image: String,    
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model('Receipt', receiptSchema);