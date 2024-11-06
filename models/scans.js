const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const scanSchema = new Schema({
    product_option: String,
    recipient: Object,
    sender: Object,
    shopee_order_no: String,
    user: {
        type: String,
    }
}); 

const Scans = mongoose.model('Scans', scanSchema);
module.exports = Scans;