const Inventory = require("../model/inventory_model");

exports.list = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ Erro: err });
    }
};

exports.findById = async (req, res) => {
    const id = req.params.id;

    try {
        const inventoryEncontrado = await Inventory.findById(id);
        if (inventoryEncontrado) {
            return res.json(inventoryEncontrado);
        } else {
            return res.status(404).json({ Erro: "Inventory não encontrado" });
        }
    } catch (err) {
        res.status(500).json({ Erro: err });
    }
};

exports.createItem = async (req, res) => {
    // Receber o produto
    const inventoryRequest = req.body;

    // Validar os dados
    if (
        inventoryRequest &&
        inventoryRequest.category &&
        inventoryRequest.subcategory &&
        inventoryRequest.description &&
        inventoryRequest.quantity &&
        inventoryRequest.price
    ) {
        // Se OK, cadastrar os produtos e retornar o status 201
        const formattedInventoryRequest = {
            ...inventoryRequest,
            purchase_date: new Date(inventoryRequest.purchase_date),
            expiry_date: new Date(inventoryRequest.expiry_date)
        };

        const inventoryNovo = new Inventory(formattedInventoryRequest);

        try {
            const inventorySalvo = await inventoryNovo.save();
            return res.status(201).json({
                ...inventorySalvo._doc,
                purchase_date: formattedInventoryRequest.purchase_date.toISOString().split('T')[0],
                expiry_date: formattedInventoryRequest.expiry_date.toISOString().split('T')[0]
            });
        } catch (err) {
            res.status(500).json({ Erro: err });
        }
    } else {
        // Caso contrário, retorna o status 400
        return res.status(400).json({
            Erro: "Category e/ou price são obrigatórios"
        });
    }
};


exports.updateItemById = async (req, res) => {
    const id = req.params.id;
    const inventoryAlterar = req.body;

    if (
        !inventoryAlterar ||
        !inventoryAlterar.category ||
        !inventoryAlterar.subcategory ||
        !inventoryAlterar.description ||
        !inventoryAlterar.quantity ||
        !inventoryAlterar.price
    ) {
        return res.status(400).json({
            Erro: "Category e/ou price são obrigatórios"
        });
    }

    try {
        const inventoryAtualizado = await Inventory.findByIdAndUpdate(id, inventoryAlterar, { new: true });
        if (inventoryAtualizado) {
            return res.json(inventoryAtualizado);
        } else {
            return res.status(404).json({ Erro: "Produto não encontrado" });
        }
    } catch (err) {
        res.status(500).json({ Erro: err });
    }
};

exports.deleteItemById = async (req, res) => {
    const id = req.params.id;

    try {
        const inventoryDeletado = await Inventory.findByIdAndDelete(id);
        if (inventoryDeletado) {
            return res.json(inventoryDeletado);
        } else {
            return res.status(404).json({ Erro: "Item não encontrado" });
        }
    } catch (err) {
        res.status(500).json({ Erro: err });
    }
};
