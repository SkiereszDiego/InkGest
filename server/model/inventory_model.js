const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    price: Number,
    quantity: Number
}, {
    versionKey: false,
    collection: "inventory"
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;