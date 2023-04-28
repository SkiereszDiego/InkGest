const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    nome: String,
    preco: Number
}, {
    versionKey: false,
    collection: "inventory"
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;