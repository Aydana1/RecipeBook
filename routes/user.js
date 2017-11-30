// User Profile
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var mongoose = require('mongoose');

// Show all users
router.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        if(err) {
            console.log(err);
        } else {
            res.render('users/index', {users: allUsers});
        }
    });
});


// Show a single user 
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(err) {
            console.log(err);
            res.redirect('/receipts');
        } else {
            console.log(foundUser);
            res.render('users/show', {user: foundUser});
        };
    });
});


router.


module.exports = router;