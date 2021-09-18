const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    price: {
        currency: {
            required: true,
            type: String
        },
        value:{
            required: true,
            type: Number
        }
    },
    description: {
        type: String
    },
    img: [{
        type: String,
    }],
    location: {
        lat: {
            required: true,
            type: Number,
        },
        long: {
            required: true,
            type: Number,
        }
    },
    creator: {
        required: true,
        type: String,
    },
    createdAt: { 
        type: Date, 
        expires: 86400, 
        default: Date.now
    }
});

module.exports = mongoose.model("Product", ProductSchema);

