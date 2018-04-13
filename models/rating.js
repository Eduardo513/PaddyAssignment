const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Rating Schema
const RatingSchema = mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    ratingScore :{
        type: Number
    },
    
});

const Rating = module.exports = mongoose.model('Rating', ItemSchema);

module.exports.getRatingById = function(id, callback){
    Rating.findById(id, callback);
}

module.exports.getRatingByUserId = function(userId, callback){
    const query = {user: userId}
    Rating.findOne(query, callback);
}

module.exports.addRating = function(newRating, callback){
    newRating.save(callback);
}



