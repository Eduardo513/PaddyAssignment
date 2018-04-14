const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Review Schema
const ReviewSchema = mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviewBody :{
        type: String
    },
    datePosted :{
        type: String
    },
    
});

const Review = module.exports = mongoose.model('Review', ReviewSchema);

module.exports.getReviewById = function(id, callback){
    Review.findById(id, callback);
}

module.exports.getReviewByUserId = function(userId, callback){
    const query = {user: userId}
    Review.findOne(query, callback);
}

module.exports.addReview = function(newReview, callback){
    console.log(newReview)
    newReview.save(callback);
}



