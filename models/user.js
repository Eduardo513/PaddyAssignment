const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
    },
    admin: {
        type: Boolean,
    },
    shoppingCart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.addItemToCart = function (item, userId, callback) {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: userId },
            { $push: { shoppingCart: item } }, (err, updatedUser) => {
                if (err)
                    return reject(err);
                else
                    return resolve(updatedUser)
            }
        );
    });
}

module.exports.getAllShoppingCartItemIdsForUser = function (userId, callback) {
    return new Promise((resolve, reject) => {
        User.findById(userId, (err, userObj) => {
            if (userObj){
                return resolve(userObj.shoppingCart)
            }
            else
                return reject(err)
        });
    });
}



module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}


