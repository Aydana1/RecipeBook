var express = require('express');
var router = express.Router();
var Receipt = require('../models/receipt');
var mongoose = require('mongoose');

// Index.ejs:  Show All Receipts     
router.get('/', (req, res) => {
    Receipt.find({}, (err, allReceipts) => {
        if(err) {
            console.log(err);
        } else {
            res.render('receipts/index', {receipts: allReceipts});
        }
    });
});

// Create a Receipt
router.post('/', (req, res) => {
        let newReceipt = 
        {
        foodName: req.body.foodName,
        ingredients: req.body.ingredients,
        duration: req.body.duration,
        author: req.body.author,
        image: req.body.image
        }
    Receipt.create(newReceipt, (err, newReceipt) => {
        if(err) {
            console.log(err);
        } else {
            console.log(newReceipt);
            res.redirect('/receipts');    // here we are going to the page to show receipts that were just created 
        }
    });
});

// New.ejs: Show the form to add a new receipt
router.get('/new', (req, res) => {
    res.render('receipts/new');  // rendering new.ejs file to showthe form to add a new receipt
});

// Show a single receipt in detail
router.get('/:id', (req, res) => {
    Receipt.findById(req.params.id, (err, foundReceipt) => {
        if(err) {
            console.log(err);
        } else {
            console.log(req.params.id);
            res.render('receipts/show', {receipt: foundReceipt});
        }
    }) ;
});

// Edit route
router.get('/:id/edit', (req, res) => {
    Receipt.findById(req.params.id, (err, foundReceipt) => {
        if(err) {
            console.log(err);
        } else {
            console.log(foundReceipt);
            res.render('receipts/edit', {receipt: foundReceipt});
        }
    });
});

//Update route
router.put('/:id', (req, res) => {
    Receipt.findByIdAndUpdate(req.body.id, req.body.receipt, (err, updatedReceipt) => {
        if(err) {
            console.log(err);
        } else {
            console.log('receipt: '+ req.body.receipt);            
            res.redirect('/receipts/' + req.params.id);
        }
    });
});

// Delete
router.delete('/:id', (req, res) => {
    Receipt.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect('/receipts');            
        } else {
            res.redirect('/receipts');
        }
    });
});

module.exports = router;