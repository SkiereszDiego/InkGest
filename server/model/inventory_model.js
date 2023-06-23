const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    purchase_date: { type: Date },
    quantity: { type: Number, default: 0 },
    expiry_date: { type: Date }
}, {
    versionKey: false,
    collection: "inventory"
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
