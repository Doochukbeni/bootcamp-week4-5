const mongoose = require('mongoose');

// Create the schema
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: false
        },
        dateCreated: {
            type: String,
            required: true,
            default: Date.now
        }
    }
)

// Create the model
const ProductModel = mongoose.model('product', ProductSchema);

// Export the model
module.exports = ProductModel;