const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Item = require('../models/item');


router.post('/createItem', (req, res, next) => {
    let newItem = new Item({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        image: req.body.image,
        discount: req.body.discount
    });

    Item.addItem(newItem, (err, newItem) =>{
        if(err){
            res.json({success: false, msg:'Failed to create item'});
        }
        else{
            res.json({success: true, msg:'Item created'});
        }
    });
});

//Register
router.put('/getAllItems', (req, res, next) => {
  
    Item.getAllItems().then(items =>{
        if(items)
        res.json({success: true, items: items, msg:'All Items Retreived'});
        else
        res.json({success: false, msg:'Failed to retrieve Items'});
    });

});

module.exports = router;
