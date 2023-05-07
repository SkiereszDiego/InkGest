const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    quantity: { type: Number }
}, {
    versionKey: false,
    collection: "inventory"
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;