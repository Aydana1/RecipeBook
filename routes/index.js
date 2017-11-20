var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

// Show register form
router.get('/register', (req, res) => {
    if(req.user){
        req.flash('error', 'You are already logged in!');
        res.redirect('/receipts');
    }
    res.render('register');
});

// Handle sign up logic
router.post('/register', (req, res) => {
    var newUser = new User({
        username: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname,
        avatar: req.body.avatar
    });

    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            req.flash('error', err.message);
            return res.render('register');
        } else {
            passport.authenticate("local")(req, res, () => {
                console.log(user);
                req.flash('success', 'You are now one of our members! Congratulations ' + user.username);
                res.redirect('/receipts');
            });
        };
    });
});

// show login form
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle Login logic
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/receipts',
        failureRedirect: '/login'
    }), (req, res) => {}
);

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You were logged out');
    res.redirect('/receipts');
});

module.exports = router;