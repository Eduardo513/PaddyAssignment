const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Item = require('../models/item');
const Review = require('../models/review');


router.post('/createItem', (req, res, next) => {
    let newItem = new Item({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        image: req.body.image,
        discount: req.body.discount,
        stock: req.body.stock,
        price: req.body.price
    });

    Item.addItem(newItem, (err, newItem) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to create item' });
        }
        else {
            res.json({ success: true, msg: 'Item created' });
        }
    });
});

router.put('/getAllItems', (req, res, next) => {

    Item.getAllItems().then(items => {
        if (items)
            res.json({ success: true, items: items, msg: 'All Items Retreived' });
        else
            res.json({ success: false, msg: 'Failed to retrieve Items' });
    });

});


router.put('/getItemById', (req, res, next) => {
    Item.getItemById(req.body.id, (err, itemObject) => {
        if (itemObject) {
      

            res.json({ success: true, itemObject: itemObject, msg: 'Item Retreived' });
        }
        else
            res.json({ success: false, msg: 'Failed to retrieve Item' });
    });
});


router.put('/addItemToCart', (req, res, next) => {
 
    Item.findById(req.body.itemId, (err, itemObj) =>{
        if(itemObj.stock <= 0)
        return res.json({ success: false, msg: 'No Items Left' });
        else
        {
        User.addItemToCart(itemObj, req.body.userId).then(updatedUser =>{

            Item.reduceStock(req.body.itemId, -2).then(reducedStockItem =>{
                if(reducedStockItem)
                 return res.json({ success: true, msg: 'Item Added to Shopping Cart' });
                }); 
        });
    }
    });
});

router.post('/createReview', (req, res, next) => {
    User.getUserById(req.body.userId, (err, userObj) => {
        if (err)
            throw err
        else {
          
            let newReview = new Review({ 
                user: userObj.id,
                reviewBody: req.body.reviewBody,
                datePosted: new Date()
            })
           
            Review.addReview(newReview, (err, reviewObj) => {  
                if (err) {
                    res.json({ success: false, msg: 'Failed to create Review' });
                }
                else{
                    res.json({ success: true, msg: 'Review Created' });
                }
            });

            Item.findOneAndUpdate({ _id: req.body.currentItem._id },
                { $push: { reviews: newReview } }, (err, addedReview) => {
                    if (err)
                        throw err;
                }
            );
        }
    });
});

//this method gets all the reviews for an item which is a list of ids,
//it then grabs the obj from that item id. it then grabs the user object from the user id in the review obj
//returns all information in object
router.put('/getAllReviewsForItem', (req, res, next) => {
    allReadableReviewObjects = [];
    Item.getItemById(req.body.id, (err, itemObject) => {
        if (itemObject) {
          if(itemObject.reviews.length == 0)
          {
            res.json({ success: false, msg: 'No Reviews on Item' });
          }
          else{
        
              itemObject.reviews.forEach(function(reviewId, index, array){
                Review.getReviewById(reviewId, (err, reviewObj)=>{
                    User.getUserById(reviewObj.user, (err, userObj) =>{
                        const readableReviewObject = {
                            reviewObj: reviewObj,
                            username: userObj.username
                        }
                        allReadableReviewObjects.push(readableReviewObject);
                        if(index == array.length -1)
                        {
                            res.json({ success: true, allReadableReviewObjects: allReadableReviewObjects, msg: 'Reviews collected' });
                        }
                    });
                    

                   
                });
                
              })
          }
        }
        else
            res.json({ success: false, msg: 'Failed to retrieve Item' });
    });
});




module.exports = router;
