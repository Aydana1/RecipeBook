var express = require('express'),
    router = express.Router({mergeParams: true}),
    mongoose = require('mongoose'),
    Receipt = require('../models/receipt')
    Comment = require('../models/comment');

// New Comment form
router.get('/new', (req, res) => {
    Receipt.findById(req.params.id, (err, foundReceipt) => {
        if(err) {
            res.redirect('/receipts');
        } else {
            res.render('comments/new', {receipt: foundReceipt});
        }
    });
});

// create comment
router.post('/', (req, res) => {
    Receipt.findById(req.params.id, (err, foundReceipt) => {        
        if(err){
            res.redirect('/receipts');
        } else {
            Comment.create(req.body.comment, (err, createdComment) => {
                if(err) {
                    req.flash('error', 'Something went wrong!');
                } else {
                    console.log(createdComment);    
                    console.log(createdComment.author.username);                
                    createdComment.author.id = req.user.id;
                    createdComment.author.username = req.user.username;
                    createdComment.save();
                    foundReceipt.comments.push(createdComment);
                    receipt.save();
                    console.log(createdComment);
                    req.flash('success', 'Successfully added comment!');
                    res.redirect('/receipts/' + foundReceipt._id);
                }
            });
        }
    });
});

module.exports = router;