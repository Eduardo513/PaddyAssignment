const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const PurchaseHistorySchema = mongoose.Schema({
    itemsPurchased: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    purchaseDate :{
        type: Date
    },
    
});

const PurchaseHistory = module.exports = mongoose.model('PurchaseHistory', PurchaseHistorySchema);

module.exports.getPurchaseHistoryById = function(id, callback){
    PurchaseHistory.findById(id, callback);
}

module.exports.addPurchaseHistory = function(newPurchaseHistory, callback){
    newPurchaseHistory.save(callback);
}



