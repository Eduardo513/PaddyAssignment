const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Item = require('../models/item');


router.post('/register', (req, res, next) => {
    let newUser = new User({
        admin: req.body.admin,
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        address: req.body.address,
        paymentMethod: req.body.paymentMethod,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        }
        else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});


router.put('/getAllItemsInCartForUser', (req, res, next) => {
    const userId = req.body.id
    var allCartItemObjects = []
    User.getAllShoppingCartItemIdsForUser(userId).then(shoppingCartItemIds => {
        if (shoppingCartItemIds.length > 0) {
            shoppingCartItemIds.forEach(function (cartItemId, index, array) {
                Item.findById(cartItemId, (err, itemObject) =>{
                    if(itemObject){
                        allCartItemObjects.push(itemObject);
                    }
                    if(allCartItemObjects.length == array.length)
                    {
                        res.json({ success: true, allCartItemObjects: allCartItemObjects, msg: 'Cart Items retreived.' });
                    }
                });
            });
        }
        else
         res.json({ success: false, msg: "No items in  user's cart." });
    });

});


router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 //1 week of seconds
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        admin: user.admin,
                        address: user.address
                    }
                });
            }
            else {
                return res.json({ success: false, msg: "Wrong Password" });
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});


module.exports = router;
