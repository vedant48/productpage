const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    fileName: { type: String, required: true },
    productName: { type: String, required: true, trim: true, maxlength: 32 },
    productPrice: { type: Number, required: true },
    productDescription: { type: String, required: true, trim: true, maxlength: 2000 },
    productCategory: { type: ObjectId, ref:'Category', required: true },
    productQuantity: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;