const Inventory = require("../model/inventory_model");


exports.list = async (req, res) => {
    try{ 
        const inventory = await Inventory.find();
        res.json(inventory);
    }
    catch(err) {
        res.status(500).json({Erro:err});
    }
}

exports.findById = async (req, res) => {
    const id = req.params.id;

    try{ 

        const inventoryEncontrado = await Inventory.findById(id);
        if(inventoryEncontrado){ 
            return res.json(inventoryEncontrado);
        }
        else {
            return res.status(404).json({ Erro: "inventory nao encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }     
}

exports.createItem = async (req, res) => { 
    //receber o produto
    const inventoryRequest = req.body;
    //validar os dados
    if(inventoryRequest && inventoryRequest.category && inventoryRequest.subcategory && inventoryRequest.description && inventoryRequest.quantity && inventoryRequest.price){
        //se OK, cadastro os produtoss e retorno 201
        const inventoryNovo = new Inventory(inventoryRequest);

        try{ 
            const inventorySalvo = await inventoryNovo.save();
            return res.status(201).json(inventorySalvo);
        }
        catch(err) { 
            res.status(500).json({Erro:err});
        }
    }
    else{
        //senao retorna 400
        return res.status(400).json({
            Erro: "Category e/ou price são obrigatorios"
        });
    }
}

exports.updateItemById = async (req, res) => { 
    const id = req.params.id;
    const inventoryAlterar = req.body;

    if(!inventoryAlterar || !inventoryAlterar.category || !inventoryAlterar.subcategory || !inventoryAlterar.description || !inventoryAlterar.quantity || !inventoryAlterar.price){
        return res.status(400).json({
            Erro: "Category e/ou price são obrigatorios"
        });
    }

    try{ 
        const inventoryAtualizado = await Inventory.findByIdAndUpdate(id, inventoryAlterar, {new: true});
        if(inventoryAtualizado){ 
            return res.json(inventoryAtualizado);
        }
        else {
            return res.status(404).json({ Erro: "Produto não encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            

}

exports.deleteItemById = async (req, res) => { 
    const id = req.params.id;

    try{ 
        const inventoryDeletado = await Inventory.findByIdAndDelete(id);
        if(inventoryDeletado){ 
            return res.json(inventoryDeletado);
        }
        else {
            return res.status(404).json({ Erro: "Item não encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            

}