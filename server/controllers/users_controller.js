const User = require("../model/users_model");
const jwt = require("jsonwebtoken")


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

        let userEncontrado = await User.findById(id);
        if(userEncontrado){
            // Cria uma nova instância do objeto de usuário sem o campo "password"
            const user = userEncontrado.toObject();
            delete user.password;
            return res.json(user);
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
            if (err.code === 11000 && err.keyValue.email) {
                return res.status(400).json({
                    Erro: "Este endereço de email já está sendo usado"
                });
            } else {
                res.status(500).json({Erro:err});
            }
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


exports.getUserByEmail = async (req, res) => { 
    if(req.query && req.query.email){
        try{ 
            let userEncontrado = await User.findOne({email: req.query.email});
            if(userEncontrado){
                // Cria uma nova instância do objeto de usuário sem o campo "password"
                const user = userEncontrado.toObject();
                delete user.password;
                return res.json(user);
            }
            else {
                return res.status(404).json({ Erro: "Usuario nao encontrado"});
            }
        } catch(err) {
            res.status(500).json({Erro:err});
        }             
    }
    else{
        return res.status(400).json({
            Erro: "Email é obrigatorio"
        });
    }
}

exports.validateLogin = async (req, res) => {
    // Ao fazer o POST ele vai verificar se tem essas 3 info
    if(req.body && req.body.email && req.body.password){
        try{
            let userEncontrado = await User.findOne({email: req.body.email});
            // Verifica se o usuario encontrado esta mandando a mesma senha que esta no body
            if(userEncontrado && userEncontrado.password == req.body.password){
                const token = jwt.sign({
                    id: userEncontrado.id
                    // name: userEncontrado.name
                }, 'S3cret2023', {expiresIn: "1h"});
                res.status(201).json({token: token})
            }
            else{
                return res.status(401).json({ Erro: "Usuário ou senha inválidos."});
            }
        } catch(err) {
            res.status(500).json({Erro:err});
        }    
    }
    else{
        return res.status(401).json({ Erro: "Usuário ou senha inválidos."});
    }
}
