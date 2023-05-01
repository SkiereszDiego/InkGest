const User = require("../model/users_model");


exports.list = async (req, res) => {
    try{ 
        const user = await User.find();
        res.json(user);
    }
    catch(err) {
        res.status(500).json({Erro:err});
    }
}

exports.getUserById = async (req, res) => {
    const id = req.params.id;

    try{ 

        const userEncontrado = await User.findById(id);
        if(userEncontrado){ 
            return res.json(userEncontrado);
        }
        else {
            return res.status(404).json({ Erro: "Usuario nao encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }     
}

exports.createUser = async (req, res) => { 
    //receber o usuario
    const userRequest = req.body;
    //validar os dados, obrigatorios. Verificar com o model
    if(userRequest && userRequest.name && userRequest.email && userRequest.password){
        //se OK, cadastro os usuarios e retorno 201
        const userNovo = new User(userRequest);

        try{ 
            const userSalvo = await userNovo.save();
            return res.status(201).json(userSalvo);
        }
        catch(err) { 
            res.status(500).json({Erro:err});
        }
    }
    else{
        //senao retorna 400
        return res.status(400).json({
            Erro: "Nome, email e senha são obrigatorios"
        });
    }
}

exports.updateUserById = async (req, res) => { 
    const id = req.params.id;
    const userAlterar = req.body;

    if(!userAlterar || !userAlterar.name || !userAlterar.email || !userAlterar.password){
        return res.status(400).json({
            Erro: "Nome, email e senha são obrigatorios"
        });
    }

    try{ 
        const userAtualizado = await User.findByIdAndUpdate(id, userAlterar, {new: true});
        if(userAtualizado){ 
            return res.json(userAtualizado);
        }
        else {
            return res.status(404).json({ Erro: "Usuário não encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            

}

exports.deleteUserById = async (req, res) => { 
    const id = req.params.id;

    try{ 
        const userDeletado = await User.findByIdAndDelete(id);
        if(userDeletado){ 
            return res.json(userDeletado);
        }
        else {
            return res.status(404).json({ Erro: "Usuário não encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            

}