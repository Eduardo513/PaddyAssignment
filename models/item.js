const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Item Schema
const ItemSchema = mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
});

const Item = module.exports = mongoose.model('Item', ItemSchema);

module.exports.getItemById = function (id, callback) {
    Item.findById(id, callback);
}

module.exports.getItemByTitle = function (title, callback) {
    const query = { title: title }
    Item.findOne(query, callback);
}

module.exports.addItem = function (newItem, callback) {
    newItem.save(callback);
}

module.exports.reduceStock = function (itemId, reductionAmount, callback) {
    return new Promise((resolve, reject) => {
        Item.findOneAndUpdate({ _id: itemId },
            { $inc: { stock: reductionAmount } }, (err, adjustedItem) => {
                if (err)
                    return reject(err);
                else
                    return resolve(adjustedItem)
            }
        );

    });

}

module.exports.getAllItems = function (callback) {
    return new Promise((resolve, reject) => {
        const query = {}
        Item.find(query, (err, items) => {
            if (err) return reject(err);
            return resolve(items);
        });
    });

}



